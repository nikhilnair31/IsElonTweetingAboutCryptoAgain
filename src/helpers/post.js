import { dbref } from "./firebase";
import dayjs from "dayjs";

export default {
    MergeArr: (tweetArr, cryptoArr) => {
        console.log(tweetArr.length, tweetArr[0]);
        console.log(cryptoArr.length, cryptoArr[0]);

        let mergedArr = []
        cryptoArr.forEach(element => {
            let obj;
            if(tweetArr.find(o => o.date === element.date) === undefined) 
                obj = {tweet: ""}
            else
                obj = tweetArr.find(o => o.date === element.date)
            console.log('obj: ', obj);
            mergedArr.push({date: element.date, price: element.price, tweet: obj.tweet});
        });
        console.log(mergedArr.length, mergedArr[0]);
        return mergedArr;
    },
    GetCryptoPrices: async (coin, fiat, days) => {
        try {
            let cryptoArr = []
            const response = await fetch("https://api.coingecko.com/api/v3/coins/"+coin+"/market_chart?vs_currency="+fiat+"&days="+days+"&interval=daily")
            const data = await response.json();
            for (var item of data.prices) {
                if (typeof item !== 'undefined'){
                    // console.log(dayjs(item[0]).format("YYYY-MM-DD")); //D MMM, YY
                    cryptoArr.push({date: dayjs(item[0]).format("YYYY-MM-DD"), price: Math.round(item[1]*10)/10});
                }
            }
            console.log(cryptoArr[0]);
            return { cryptoArr };
        } 
        catch (e) {
            console.log(e);
        }
    },
    GetElonTweets: async () => {
        try {
            let tweetArr = []
            var refx = dbref.ref("tweets")
            refx.on("value", function(snapshot) {
                snapshot.forEach((childSnapshot) => {
                    // console.log(childSnapshot.val());
                    tweetArr.push(childSnapshot.val());
                });
                console.log(tweetArr[0]);
            });
            return { tweetArr };
        } 
        catch (e) {
            console.log(e);
        }
    }
};