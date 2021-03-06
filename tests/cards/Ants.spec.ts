import { expect } from "chai";
import { Ants } from "../../src/cards/Ants";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { SelectCard } from "../../src/inputs/SelectCard";
import { ICard } from "../../src/cards/ICard";
import { ProtectedHabitats } from "../../src/cards/ProtectedHabitats";
import { Tardigrades } from "../../src/cards/Tardigrades";
import { NitriteReducingBacteria } from "../../src/cards/NitriteReducingBacteria";
import { Fish } from "../../src/cards/Fish";
import { SecurityFleet } from "../../src/cards/SecurityFleet";

describe("Ants", function () {
    let card : Ants, player : Player, player2 : Player, game : Game;

    beforeEach(function() {
        card = new Ants();
        player = new Player("test", Color.BLUE, false);
        player2 = new Player("test2", Color.RED, false);
        game = new Game("foobar", [player, player2], player);
    });
    
    it("Can't play without oxygen", function () {
        (game as any).oxygenLevel = 3;
        expect(card.canPlay(player, game)).is.not.true;
    });

    it("Should play", function () {
        (game as any).oxygenLevel = 4;
        expect(card.canPlay(player, game)).is.true;

        card.play();
        card.resourceCount += 5;
        expect(card.getVictoryPoints()).to.eq(2);
    });

    it("Should action with multiple valid targets", function () {
        const tardigrades = new Tardigrades();
        const nitriteReducingBacteria = new NitriteReducingBacteria();

        player.playedCards.push(card);
        expect(card.canAct(player, game)).is.not.true;

        player2.playedCards.push(tardigrades, nitriteReducingBacteria);
        tardigrades.resourceCount++;
        nitriteReducingBacteria.resourceCount++;
        
        expect(card.canAct(player, game)).is.true;

        card.action(player, game);
        const selectCard = game.deferredActions.shift()!.execute() as SelectCard<ICard>;
        expect(selectCard.cards).has.lengthOf(2);
        selectCard.cb([selectCard.cards[0]]);
        game.deferredActions.shift()!.execute(); // Add microbe to ants

        expect(card.resourceCount).to.eq(1);
        expect(tardigrades.resourceCount).to.eq(0);
    });

    it("Respects protected habitats", function () {
        const protectedHabitats = new ProtectedHabitats();
        const tardigrades = new Tardigrades();

        player.playedCards.push(card);
        player2.playedCards.push(tardigrades);
        tardigrades.resourceCount += 2;
        expect(card.canAct(player, game)).is.true;

        player2.playedCards.push(protectedHabitats);
        expect(card.canAct(player, game)).is.not.true;
    });

    it("Only microbes are available to steal", function () {
        const tardigrades = new Tardigrades(); // card with microbes
        const fish = new Fish() // card with animals
        const securityFleet = new SecurityFleet() // card with fighters

        player.playedCards.push(card);
        player2.playedCards.push(tardigrades, fish, securityFleet);
        player2.addResourceTo(tardigrades);
        player2.addResourceTo(fish);
        player2.addResourceTo(securityFleet);

        card.action(player, game);
        const selectCard = game.deferredActions.shift()!.execute() as SelectCard<ICard>;
        expect(selectCard).is.undefined; // Only one option: Tardigrades
        game.deferredActions.shift()!.execute(); // Add microbe to ants

        expect(card.resourceCount).to.eq(1);
        expect(tardigrades.resourceCount).to.eq(0);
    });
});
