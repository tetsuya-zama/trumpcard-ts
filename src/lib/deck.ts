import {ICard, Card, SuiteCard, CardUtil} from './card'

export class Deck<T extends ICard> {
    private constructor(private _cards: Array<T>){}

    static withJoker(): Deck<Card>{
        return new Deck<Card>(CardUtil.newFullCardSet());
    }

    static withoutJoker(): Deck<SuiteCard>{
        return new Deck<SuiteCard>(CardUtil.newSuiteCardSet());
    }

    static fromCardsWithJoker(cards: Array<Card>): Deck<Card>{
        return new Deck<Card>(cards);
    }

    static fromCardsWithoutJoker(cards: Array<SuiteCard>): Deck<SuiteCard>{
        return new Deck<SuiteCard>(cards);
    }

    draw(): T{
        const card = this._cards.shift();
        if(card){
            return card;
        }else{
            throw new Error("The deck is empty");
        }
    }

    shuffle(): void{
        for (let i = this._cards.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
        }
    }

    put(card: T): void{
        this._cards = [card, ...this._cards];
    }

    get isEmpty(): boolean{
        return this._cards.length === 0;
    }

    get cards(): Array<T>{
        return [...this._cards];
    }

    get length(): number{
        return this._cards.length;
    }
}