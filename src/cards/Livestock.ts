
import { IActionCard, IResourceCard } from "./ICard";
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Game } from "../Game";
import { Player } from "../Player";
import { ResourceType } from "../ResourceType";
import { Resources } from "../Resources";
import { CardName } from "../CardName";

export class Livestock implements IActionCard, IProjectCard, IResourceCard {
    public cost = 13;
    public cardType = CardType.ACTIVE;
    public resourceType = ResourceType.ANIMAL;
    public resourceCount: number = 0;
    public tags = [Tags.ANIMAL];
    public name = CardName.LIVESTOCK;
    public canPlay(player: Player, game: Game): boolean {
        return game.getOxygenLevel() >= 9 - player.getRequirementsBonus(game) && player.getProduction(Resources.PLANTS) >= 1;
    }
    public getVictoryPoints(): number {
        return this.resourceCount;
    }
    public play(player: Player) {
        player.addProduction(Resources.PLANTS,-1);
        player.addProduction(Resources.MEGACREDITS,2);
        return undefined;
    }
    public canAct(): boolean {
        return true;
    }
    public action(player: Player) {
        player.addResourceTo(this);
        return undefined;
    }
}
    
