
import { Tags } from "../Tags";
import { Player } from "../../Player";
import { Game } from "../../Game";
import { CorporationCard } from "./CorporationCard";
import { IProjectCard } from "../IProjectCard";
import { Resources } from "../../Resources";
import { CardName } from "../../CardName";
import { ICard } from "../ICard";
import { CardType } from "../CardType";

export class SaturnSystems implements CorporationCard {
    public name = CardName.SATURN_SYSTEMS;
    public tags = [Tags.JOVIAN];
    public startingMegaCredits: number = 42;
    public cardType = CardType.CORPORATION;

    public onCardPlayed(_player: Player, game: Game, card: IProjectCard) {
        for (const tag of card.tags) {
            if (tag === Tags.JOVIAN) {
                game.getCardPlayer(this.name).addProduction(Resources.MEGACREDITS);
            }
        }
    }

    public onCorpCardPlayed(_player: Player, game: Game, card: CorporationCard) {
        return this.onCardPlayed(_player,game,card as ICard as IProjectCard);
    }

    public play(player: Player) {
        player.addProduction(Resources.TITANIUM);
        player.addProduction(Resources.MEGACREDITS);
        return undefined;
    }
}
