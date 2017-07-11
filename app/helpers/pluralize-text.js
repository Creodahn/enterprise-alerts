/*
 * This helper expects two parameters: a number and some text. If the number is
 * equal to one, it does not add a 's' to the text, otherwise it does.
 *
 * If this helper was used more extensively, its logic could be improved by
 *   1) Detecting words that already end in 's' and pluralizing with 'es'
 *   2) Doing better checking that the parameters are what was expected
 */
import Ember from 'ember';

export function pluralizeText(params/* , hash */) {
  const count = params[1],
        text = params[0];

  return `${text}${count === 1 ? '' : 's'}`;
}

export default Ember.Helper.helper(pluralizeText);
