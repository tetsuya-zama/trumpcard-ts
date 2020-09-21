import { CardUtil, Suite } from '#/lib/card';

describe("CardUtil.nameOfNum",() => {
    it("returns the name of trump card number",() => {
        const result = [1,2,3,4,5,6,7,8,9,10,11,12,13].map(n => CardUtil.nameOfNum(n));
        expect(result).toStrictEqual(["A","2","3","4","5","6","7","8","9","10","J","Q","K"]);
    });
});

describe("CardUtil.newSuiteCardSet",() => {
    it("returns SuiteCard array of all kind of trump card except Joker",() =>{
        const result = CardUtil.newSuiteCardSet();

        expect(result.length).toBe(52);
        expect(result.every(card => !card.isJoker));
        [1,2,3,4,5,6,7,8,9,10,11,12,13].forEach(n => {
            expect(result.filter(card => card.num === n).length).toBe(4);
        });

        [Suite.CLOVER, Suite.DIAMOND, Suite.HEART, Suite.SPADE].forEach(s => {
            expect(result.filter(card => card.suite === s).length).toBe(13);
        });

        result.forEach(card => {
            expect(card.name).toBe(`${CardUtil.nameOfNum(card.num)} of ${card.suite}`);
        });
    });
});

describe("CardUtil.newFullCardSet",() => {
    it("returns Card array of all kind of trump card with two Jokers",()=>{
        const result = CardUtil.newFullCardSet();

        expect(result.length).toBe(54);
        expect(result.filter(card => card.isJoker).length).toBe(2);
        [1,2,3,4,5,6,7,8,9,10,11,12,13].forEach(n => {
            expect(result.filter(card => CardUtil.isSuiteCard(card) && card.num === n).length).toBe(4);
        });

        [Suite.CLOVER, Suite.DIAMOND, Suite.HEART, Suite.SPADE].forEach(s => {
            expect(result.filter(card => CardUtil.isSuiteCard(card) && card.suite === s).length).toBe(13);
        });

        result.forEach(card => {
            if(CardUtil.isSuiteCard(card)){
                expect(card.name).toBe(`${CardUtil.nameOfNum(card.num)} of ${card.suite}`);
            }else{
                expect(card.name).toBe("Joker");
            }
        })
    });
});