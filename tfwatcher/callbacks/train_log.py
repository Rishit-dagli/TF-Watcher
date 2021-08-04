from utils import *


class train_epoch_Log(tf.keras.callbacks.Callback):
    def __init__(self, schedule: Union[int, list], round_time: int = 2,display_at_epoch=False):
        super().__init__()
        self.schedule = schedule
        self.start_time = None
        self.end_time = None
        self.times = list()
        self.round_time = round_time
        self.losses = []
        self.acc=[]
        self.val_loss=[]
        self.val_acc=[]
        self.epochs_count=[]
        self.avg_time_list=[]
        self.display_at_epoch=display_at_epoch
       
        

        self.is_int = False
        self.is_list = False
        if isinstance(self.schedule, int):
            self.is_int = True
        elif isinstance(self.schedule, list):
            self.is_list = True
        else:
            raise ValueError(
                "schedule should either be an integer or a list of integers"
            )

        if self.is_list:
            try:
                self.schedule = list(map(int, self.schedule))
            except (ValueError, TypeError) as err:
                raise Exception(
                    "All elements in the list should be convertible to int: {}".format(
                        err
                    )
                )

    def on_epoch_begin(self, epoch, logs=None):
        self.start_time = tf.timestamp()

    def on_epoch_end(self, epoch: int, logs: dict = None):
        self.end_time = tf.timestamp()

        # Use Python built in functions to allow using in @tf.function see
        # https://github.com/tensorflow/tensorflow/issues/27491#issuecomment-890887810
        time = float(self.end_time - self.start_time)
        self.times.append(time)
        self.losses.append(logs['loss'])
        self.acc.append(logs['accuracy'])
        self.val_loss.append(logs['val_loss'])
        self.val_acc.append(logs['val_accuracy'])
        self.epochs_count.append(epoch)
        self.avg_time_list.append(round(mean(self.times), self.round_time))

        self.display_json_logs={
               "Epoch : ":self.epochs_count, "Loss":self.losses,"Accuracy":self.acc,"Validation Loss":self.val_loss,"Validation Accuracy":self.val_acc,"Average_Time":self.avg_time_list
        }
        json_logs=json.dumps(self.display_json_logs)

        if self.display_at_epoch==True:
          print(json_logs)
        else:
          pass        



        # Since we have similar logging code use the fact that if first argument of and is False Python doesn't
        # execute the second argument
        if (self.is_int and ((epoch + 1) % self.schedule == 0)) or (
            self.is_list and ((epoch + 1) in self.schedule)
        ):
            data = logs
            data["epoch"] = epoch
            data["avg_time"] = round(mean(self.times), self.round_time)
            print(data)
            

