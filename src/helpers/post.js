import { dbref } from "./firebase";
import dayjs from "dayjs";

export default {
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
            console.log(`tweetArr = []`);
            let tweetArr = []
            var refx = dbref.ref("tweets")
            refx.on("value", function(snapshot) {
                console.log(snapshot);
                snapshot.forEach((childSnapshot) => {
                    tweetArr.push(childSnapshot.val());
                });
                console.log('tweetArr[0]', tweetArr[0]);
            });
            console.log(`return tweetArr`);
            return { tweetArr };
        } 
        catch (e) {
            console.log(e);
        }
    }
};