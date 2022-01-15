import firebase from 'firebase/compat/app';
import { dbref } from "./firebase";
import dayjs from "dayjs";

export default {
    GetCryptoPrices: async (coin, fiat, days) => {
        try {
            let cryptoArr = []
            const response = await fetch("https://api.coingecko.com/api/v3/coins/"+coin+"/market_chart?vs_currency="+fiat+"&days="+days+"&interval=daily")
            const data = await response.json();
            for (var item of data.prices) {
                if (typeof item !== 'undefined')
                    cryptoArr.push({time: dayjs(item[0]).format("D MMM, YY"), price: Math.round(item[1]*10)/10});
            }
            return { cryptoArr };
        } 
        catch (e) {
            console.log(e);
        }
    },
    postsNextBatch: async (key) => {
        try {
            const data = await dbref.collection("posts").orderBy("utc", "desc").startAfter(key).limit(10).get();
            let posts = [];
            let lastKey = "";

            data.forEach((doc) => {
                posts.push({ id: doc.id, post: doc.data() });
                lastKey = doc.data().utc;
            });

            return { posts, lastKey };
        } 
        catch (e) {
          //console.log(e);
        }
    }
};