import Component from '@ember/component';
import layout from './template';

import { tagName } from 'ember-decorators/component';
import { argument } from '@ember-decorators/argument';
import { required } from '@ember-decorators/argument/validation';
import { type } from '@ember-decorators/argument/type';

@tagName('')
export default class DocsSvgIconComponent extends Component {
  layout = layout;
  static positionalParams = ['icon'];

  @argument
  @required
  icon;

  @argument({ defaultIfUndefined: true })
  @type('number')
  height = 16;

  @argument({ defaultIfUndefined: true })
  @type('number')
  width = 16;
}
