import { Tags } from "../Tags";
import { Player } from "../../Player";
import { CorporationCard } from "./../corporation/CorporationCard";
import { IProjectCard } from "../IProjectCard";
import { Game } from "../../Game";
import { SelectCard } from "../../inputs/SelectCard";
import { CardName } from "../../CardName";
import { CardType } from "../CardType";


export class ValleyTrust implements CorporationCard {
    public name = CardName.VALLEY_TRUST;
    public tags = [Tags.EARTH];
    public startingMegaCredits: number = 37;
    public cardType = CardType.CORPORATION;

    public getCardDiscount(_player: Player, _game: Game, card: IProjectCard) {
        return card.tags.filter(tag => tag === Tags.SCIENCE).length * 2;
    }

    public initialActionText: string = "Draw 3 Prelude cards, and play one of them";
    public initialAction(player: Player, game: Game) {
        if (game.gameOptions.preludeExtension) {
            const cardsDrawn: Array<IProjectCard> = [
                game.dealer.dealPreludeCard(),
                game.dealer.dealPreludeCard(),
                game.dealer.dealPreludeCard()
            ];

            return new SelectCard("Choose prelude card to play", "Play", cardsDrawn, (foundCards: Array<IProjectCard>) => {
                if (foundCards[0].canPlay === undefined || foundCards[0].canPlay(player, game)) {
                    return player.playCard(game, foundCards[0]);
                } else {
                    throw new Error("You cannot pay for this card");
                }
            }, 1, 1);
        }
        else {
            console.warn("Prelude extension isn't selected.");
            return undefined;
        }
    }

    public play() {
        return undefined;
    }
}
