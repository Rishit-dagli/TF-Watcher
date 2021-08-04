
from utils import *
class test_log_metric(Callback):
  def __init__(self,schedule: Union[int, list], round_time: int = 2,display_at_batch=False):
    super().__init__()
    self.schedule = schedule
    self.start_time = None
    self.end_time = None
    self.times = list()
    self.round_time = round_time
    self.losses=[]
    self.acc=[]
    self.epoch_list=[]
    self.avg_time_list=[]
    self.display_at_batch=display_at_batch


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

    
  def on_test_begin(self, logs=None):
      print("Starting testing ...")
        
  def on_test_batch_begin(self,epoch,batch, logs=None):
      self.start_time = tf.timestamp()
      #print(f"Testing: Starting batch {batch}")
      self.epoch_list.append(epoch)
      
    
  def on_test_batch_end(self,batch, logs=None):
      self.end_time = tf.timestamp()

      # Use Python built in functions to allow using in @tf.function see
      # https://github.com/tensorflow/tensorflow/issues/27491#issuecomment-890887810
      time = float(self.end_time - self.start_time)
      self.times.append(time)
      self.avg_time_list.append(round(mean(self.times), self.round_time))
      print(f"Testing: Finished batch {batch}")
      self.losses.append(logs['loss'])
      self.acc.append(logs['accuracy'])
   

      test_batch_dict={
          "Epoch":self.epoch_list,"Loss":self.losses, "Accuracy" : self.acc ,"Times": self.times,"Average Time ": self.avg_time_list
      }

      test_batch_metrics_json=json.dumps(test_batch_dict)
      if self.display_at_batch==True:
        print(test_batch_metrics_json)
      else:
        pass
        
        
  def on_test_end(self, logs=None):
      print("Finished testing")
        
