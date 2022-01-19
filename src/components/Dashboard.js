import React, {useEffect, useState} from 'react';
import { ResponsiveContainer, ComposedChart, AreaChart, Area, Line, Scatter, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import TimeButton from './TimeButton';
import SocialButton from './SocialButton';
import Post from "../helpers/post.js";
import dayjs from "dayjs";
import './Dashboard.scss';

const Dashboard = () => {
    const [matches, setMatches] = useState( window.matchMedia("(min-width: 768px)").matches )
    const [pointRadius, setpointRadius] = useState(10);
    const [cryptoname, setcryptoName] = useState('dogecoin');
    const [fiatname, setfiatname] = useState('inr');
    const [timeSpan, setTimeSpan] = useState(365);
    const [interval, setinterval] = useState('daily');
    
    const [cryptoState, setCryptoState] = useState([]);
    const [tweetState, setTweetState] = useState([]);
    const [tweetcryptoMergeDone, settweetcryptoMergeDone] = useState(false);
    const [cryptoLoadDone, setcryptoLoadDone] = useState(false);
    const [tweetLoadDone, settweetLoadDone] = useState(false);

    var currency_symbols = {
        'USD': '$', // US Dollar
        'EUR': '€', // Euro
        'CRC': '₡', // Costa Rican Colón
        'GBP': '£', // British Pound Sterling
        'ILS': '₪', // Israeli New Sheqel
        'INR': '₹', // Indian Rupee
        'JPY': '¥', // Japanese Yen
        'KRW': '₩', // South Korean Won
        'NGN': '₦', // Nigerian Naira
        'PHP': '₱', // Philippine Peso
        'PLN': 'zł', // Polish Zloty
        'PYG': '₲', // Paraguayan Guarani
        'THB': '฿', // Thai Baht
        'UAH': '₴', // Ukrainian Hryvnia
        'VND': '₫', // Vietnamese Dong
    };

    const handleCryptoNameChange = event => { setcryptoName(event.target.value); };
    const handleFiatNameChange = event => { setfiatname(event.target.value); };

    function findTweetOnDate(date) {
        if(tweetState.find(o => o.date === date) === undefined) return ""
        else return tweetState.find(o => o.date === date).tweet
    }
    function findDateOnIndex(ind) {
        return cryptoState[ind].date
    }
    function formatDate(date) {
        return dayjs(date).format("D MMM, YY")
    }
    function MergeCryptoAndTweets() {
        console.log(`MergeCryptoAndTweets`);
        let mergeState = cryptoState;
        console.log('pre cryptoState: ', mergeState);
        console.log('pre tweetState: ', tweetState);
        mergeState.forEach(element => {
            let tweetOnDate = findTweetOnDate(element.date);
            // console.log('tweetOnDate: ', tweetOnDate);
            element.tweet = tweetOnDate;
        });
        console.log('post mergeState: ', mergeState);
        console.log('post tweetState: ', tweetState);
        setCryptoState(mergeState);
        settweetcryptoMergeDone(true);
    }
    function GetCryptoPrices() {
        console.log(`GetCryptoPrices`);
        Post.GetCryptoPrices(cryptoname, fiatname, timeSpan, interval)
            .then((res) => {
                setCryptoState(res.cryptoArr);
                setcryptoLoadDone(true);
            })
            .catch((err) => {
                console.log(err);
        });
    }
    function GetElonTweets() {
        console.log(`GetElonTweets`);
        Post.GetElonTweets()
            .then((res) => {
                if(res.tweetArr !== undefined) {
                    setTweetState(res.tweetArr);
                }
                settweetLoadDone(true);
            })
            .catch((err) => {
                console.log(err);
        });
    }

    useEffect(() => {
        console.log(`useEffect`);
        window.matchMedia("(min-width: 600px)").addEventListener('change', e => setMatches( e.matches ));
        if(!cryptoLoadDone || timeSpan)
            GetCryptoPrices();
        if(!tweetLoadDone)
            GetElonTweets();
        if(!tweetcryptoMergeDone && cryptoLoadDone && tweetLoadDone)
            MergeCryptoAndTweets();
    }, [cryptoLoadDone, tweetLoadDone, tweetState, timeSpan])

    const CustomTooltip = ({ active, payload, label }) => {
        let muskpflink = 'https://pbs.twimg.com/profile_images/1474910968157249536/FS8-70Ie_400x400.jpg';
        let getCurrSymbol = currency_symbols[fiatname.toUpperCase()]!==undefined?currency_symbols[fiatname.toUpperCase()]:'';
        if (active && payload !== null) {
            if (matches) {
                // let formattedDate = formatDate(label);
                let formattedDate = label;
                let tweetOnDate = findTweetOnDate(label);
                return (
                    <div className="custom_tooltip">
                        <div className="custom_tooltip" style={{display: 'flex'}}>
                            {tweetOnDate !== '' && <input className="elon_pfp" type="image" src={muskpflink} alt='elon_pfp?' />}
                            <p className="label">{`${getCurrSymbol} ${payload[0].value} - ${formattedDate}`}</p>
                            {/* {tweetOnDate !== '' && <p className="label">Elon</p>} */}
                        </div>
                        {tweetOnDate && <p className="tweet">{`${tweetOnDate}`}</p>}
                    </div>
                );
            }
            else {
                let formattedDate = formatDate(findDateOnIndex(label));
                let tweetOnDate = findTweetOnDate(findDateOnIndex(label));
                return (
                    <div className="custom_tooltip">
                        <div className="custom_tooltip" style={{display: 'flex'}}>
                            {tweetOnDate !== '' && <input className="elon_pfp" type="image" src={muskpflink} alt='elon_pfp?' />}
                            <p className="label">{`${getCurrSymbol} ${payload[0].value} - ${formattedDate}`}</p>
                            {/* {tweetOnDate !== '' && <p className="label">Elon</p>} */}
                        </div>
                        {tweetOnDate && <p className="tweet">{`${tweetOnDate}`}</p>}
                    </div>
                );
            }
        }
        return null;
    };
    const CustomizedDot = (props) => {
        const { cx, cy, stroke, payload, value } = props;
        if (findTweetOnDate(payload.date) !== '') {
            return (
                <svg x={cx-pointRadius} y={cy-pointRadius} width={300} height={300} viewBox="0 0 300 300">
                    <circle cx={pointRadius} cy={pointRadius} r={pointRadius} fill="#f2cc93" />
                </svg>
            );
        }
        return (
            null
        );
    };

    return (
        <div className="dashboard">
            <div className="header">
                <div className="title">
                    <input className="title_img" type="image" src='./favicon2.png' alt='iselontweetingaboutcryptoagain?' />
                    <p className="title_label">iselontweetingaboutcryptoagain?</p>
                </div>
                <h3 className="subtext">see the influence of the elon's tweets on crypto prices</h3>
                <div className="crptofiat_container">
                    <input className="crptofiat_input" placeholder="dogecoin" onChange={handleCryptoNameChange}></input>
                    <input className="crptofiat_input" placeholder="inr" onChange={handleFiatNameChange}></input>
                    <button className="crptofiat_button" onClick={() => GetCryptoPrices()}>Show</button>
                </div>
            </div>
            <div className='main_chart_container' >
                {(matches) &&
                    <ResponsiveContainer className="resp_chart" width="97%" height="99.9%">
                        <ComposedChart className="main_chart" width={1450} height={380} data={cryptoState} >
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="40%" stopColor="#8884d8" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} stroke="#3b3b3b" strokeDasharray="1 1" />
                            <XAxis dataKey="date" style={{ fontFamily: 'Space Grotesk', fontSize: '0.9rem',}}/>
                            <YAxis style={{ fontFamily: 'Space Grotesk', fontSize: '0.9rem',}}/>
                            <Tooltip  content={<CustomTooltip />} wrapperStyle={{backgroundColor: "#f2cc93", color: "black", borderRadius: "1pc", fontSize: '1rem'}}/>
                            <Area type="monotone" dataKey="price" stroke="#8884d8" fill="url(#colorValue)" dot={<CustomizedDot />} />
                        </ComposedChart>
                    </ResponsiveContainer>
                }
                {(!matches) &&
                    <ResponsiveContainer className="resp_chart" width="90%" height="99.9%">
                        <ComposedChart className="main_chart" width={350} height={420} data={cryptoState} >
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="40%" stopColor="#8884d8" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Tooltip  content={<CustomTooltip />} wrapperStyle={{backgroundColor: "#f2cc93", color: "black", borderRadius: "1pc", fontSize: '1rem'}}/>
                            <Area type="monotone" dataKey="price" stroke="#8884d8" fill="url(#colorValue)" dot={<CustomizedDot />} />
                        </ComposedChart>
                    </ResponsiveContainer>
                }
            </div>
            <div className="timebutton_container">
                <TimeButton button_text="1 M" setTimeSpan={setTimeSpan} setinterval={setinterval} setpointRadius={setpointRadius} />
                <TimeButton button_text="1 Y" setTimeSpan={setTimeSpan} setinterval={setinterval} setpointRadius={setpointRadius}/>
                <TimeButton button_text="3 Y" setTimeSpan={setTimeSpan} setinterval={setinterval} setpointRadius={setpointRadius}/>
            </div>
            <div className="socials_container">
                <SocialButton socialname='Twitter' button_image="./images/twitter_icon.png" alt="Twitter" link="https://twitter.com/_silhouettte_"/>
                <SocialButton socialname='Personal Site' button_image="./images/site_icon.png" alt="Personal Site" link="https://nikhil-nair.web.app/"/>
                <SocialButton socialname='Instagram' button_image="./images/instagram_icon.png" alt="Instagram" link="https://www.instagram.com/_nikhilnair_/"/>
            </div>
        </div>
    );
}

export default Dashboard;