import React from 'react';
import Particles from 'react-particles-js';

import '../css/particles.style.css';

const ParticlesComponent = () => (
  <div style={{ position: 'absolute', marginTop: '-100px', height: '90vh' }}>
    <Particles
      params={{
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: 'repulse',
            },
            onresize: {
              enable: true,
              density_auto: true,
              density_area: 400,
            },
          },
        },
      }}
    />
  </div>
);

export default ParticlesComponent;
