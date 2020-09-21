import { Card, SuiteCard } from '#/lib/card';
import { Deck } from '#/lib/deck';

describe("Deck",() => {
    describe("withJoker", () => {
        it("returns deck of all kind of trump card with two Jokers",() => {
            const deck = Deck.withJoker();

            expect(deck.length).toBe(54);
            expect(deck.cards.some(card => card.isJoker)).toBe(true);
        });
    });

    describe("withoutJoker", () => {
        it("returns deck of all kind of trump card without Jokers", () => {
            const deck = Deck.withoutJoker();

            expect(deck.length).toBe(52);
            expect(deck.cards.some(card => card.isJoker)).toBe(false);
        });
    });

    describe("fromCardsWithJoker", () => {
        it("creates Deck with Joker from existing cards",() => {
            const deckOrigin = Deck.withJoker();

            const cards: Array<Card> = [...Array(20)].map(_ => deckOrigin.draw());

            const deckNew = Deck.fromCardsWithJoker(cards);
            expect(deckNew.length).toBe(20);
        });
    });

    describe("fromCardsWithoutJoker", () => {
        it("creates Deck without Joker from existing cards", () => {
            const deckOrigin = Deck.withoutJoker();

            const cards : Array<SuiteCard> = [...Array(51)].map(_ => deckOrigin.draw());

            const deckNew = Deck.fromCardsWithoutJoker(cards);
            expect(deckNew.length).toBe(51);
        });
    });

    describe("draw",() => {
        it("returns a card of deck and removes the card from deck",() => {
            const deck = Deck.withJoker();
            expect(deck.length).toBe(54);

            const originalCards = [...deck.cards]
            const card = deck.draw();

            expect(card.name).toBe(originalCards[0].name);
            expect(deck.length).toBe(53);

        });

        it("throws error if the deck is empty",() => {
            const deck = Deck.withoutJoker();
            expect(deck.length).toBe(52);

            while(!deck.isEmpty){
                deck.draw();
            }

            expect(deck.isEmpty).toBe(true);
            expect(deck.length).toBe(0);

            expect(() => deck.draw()).toThrowError("The deck is empty");
        });
    });

    describe("put", () => {
        it("adds the card to deck",() => {
            const deck = Deck.withJoker();
            expect(deck.length).toBe(54);

            const cards = [...Array(10)].map(_ => deck.draw());
            expect(deck.length).toBe(44);

            cards.forEach(card => deck.put(card));
            expect(deck.length).toBe(54);
        });
    });

    describe("shuffle", () => {
        it("shuffle the cards of the deck",() => {
            const deck = Deck.withJoker();
            const originalCards = [...deck.cards];

            deck.shuffle();

            const sameCards = deck.cards.map((card,idx) => card.name === originalCards[idx].name);
            expect(sameCards.filter(r => r === true).length).toBeLessThanOrEqual(30);
        });
    })
});