export enum Suite{
    HEART = "Heart",
    SPADE = "Spade",
    CLOVER = "Clover",
    DIAMOND = "Diamond"
}

const suitesOfCard = [Suite.HEART, Suite.SPADE, Suite.CLOVER, Suite.DIAMOND]

const numsOfCard = [1,2,3,4,5,6,7,8,9,10,11,12,13];

export interface ICard{
    readonly name: string
    readonly isJoker: boolean
}

export interface SuiteCard extends ICard{
    readonly num: number
    readonly suite: Suite
}

export interface Joker extends ICard{

}

export type Card = SuiteCard | Joker



class SuiteCardImpl implements SuiteCard{
    private constructor(private _suite:Suite, private _num: number){}

    static of(suite: Suite, num: number): SuiteCard{
        return new SuiteCardImpl(suite, num);
    }

    get suite(){
        return this._suite;
    }

    get num(){
        return this._num;
    }

    get isJoker(){
        return false;
    }

    get name(){
        return `${CardUtil.nameOfNum(this._num)} of ${this._suite}`
    }
}



class JokerImpl implements Joker{
    private constructor(){}

    static new(): Joker{
        return new JokerImpl();
    }

    get name(){
        return "Joker";
    }

    get isJoker(){
        return true;
    }
}

export namespace CardUtil{
    export const newSuiteCardSet = (): Array<SuiteCard> => suitesOfCard.map(suite => numsOfCard.map(num => SuiteCardImpl.of(suite, num))).flat();
    export const newFullCardSet = (): Array<Card> => [...newSuiteCardSet(), JokerImpl.new(), JokerImpl.new()];
    export const isSuiteCard = (card :Card): card is SuiteCard => !card.isJoker;
    export function nameOfNum(num: number): string{
        switch(num){
            case 1:
                return "A";
            case 11:
                return "J";
            case 12:
                return "Q";
            case 13:
                return "K";
            default:
                return num.toString();
        }
    }
}