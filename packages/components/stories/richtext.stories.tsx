import React from 'react'

import { storiesOf } from '@storybook/react'

import { RichText } from '../src'

storiesOf('RichText', module)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .addDecorator((storyFn:any) => <div style={{ textAlign: 'center' }}>{storyFn()}</div>)
  .add('Default rich text editor', () => <RichText />)
  .add('Disabled rich text editor', () => <RichText disabled />)
