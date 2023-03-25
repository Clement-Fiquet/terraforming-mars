import {expect} from 'chai';
import {runAllActions} from '../../TestingUtils';
import {AsteroidHollowing} from '../../../src/server/cards/promo/AsteroidHollowing';
import {TestPlayer} from '../../TestPlayer';
import {testGame} from '../../TestGame';

describe('AsteroidHollowing', function() {
  let card: AsteroidHollowing;
  let player: TestPlayer;

  beforeEach(function() {
    card = new AsteroidHollowing();
    [/* skipped */, player] = testGame(2, {skipInitialCardSelection: true});
  });

  it('Should play', function() {
    expect(card.play(player)).is.undefined;
  });

  it('Can not act', function() {
    player.playedCards.push(card);
    expect(card.canAct(player)).is.not.true;
  });

  it('Should act', function() {
    player.titanium = 1;

    expect(card.canAct(player)).is.true;
    expect(card.action(player)).is.undefined;

    runAllActions(player.game);

    expect(player.titanium).to.eq(0);
    expect(card.resourceCount).to.eq(1);
    expect(player.production.megacredits).to.eq(1);
  });

  it('Should give victory points', function() {
    player.playedCards.push(card);
    player.titanium = 2;

    expect(card.action(player)).is.undefined;
    runAllActions(player.game);
    expect(player.popWaitingFor()).is.undefined;

    expect(card.getVictoryPoints()).to.eq(0);

    expect(card.action(player)).is.undefined;

    runAllActions(player.game);

    expect(player.popWaitingFor()).is.undefined;
    expect(card.getVictoryPoints()).to.eq(1);
  });
});
