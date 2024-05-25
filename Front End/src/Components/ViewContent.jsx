import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { useLocation } from 'react-router-dom';

function ViewContent({ content }) {
    const location = useLocation()
    const {title} = location.state
    console.log(title);
    function Comment() {
        return (
            <div className='comment'>
                <div className="comment_user">
                    <img src="./src/assets/logo.png" alt="" width={'40px'} height={'40px'}/>
                    <p>یوذر</p>
                </div>
                <p className="comment_content">
                    پسند ہے" نائیلہ کو اندازہ تھا کہ یہ بحث کہاں جائے گی ورنہ مجال کہ وہ اپنی اولاد کے ساتھ کھڑی نہ ہوتی "بھابھی رشتہ تو بھائی صاحب نے کیا تھا، پھر میں" "بھائی صاحب مر گئے، تم اپنا بتاؤ" "چچی یہ کیا" کامران کا غصہ اب الجھن میں بدل گیا تھا۔ "نہیں بھابھی"
                </p>
            </div>
        )
    }
    return (
        <div className='viewContent'>
            <h1 className='title'>
                {title}
            </h1>
            <p className='viewContent_writer'>اذ قلم: ذیشان عاشر</p>
            <p className='viewContent_content'>
                عائشہ دائی کے صحن میں مولوی فضل الدین افضل کبھی دائیں بھاگ رہے تھے کبھی بائیں۔ پاس بیٹھی عائشہ دائی کی بیٹی جو مولوی صاحب کی دو بیٹیوں کو سنبھال رہی تھی ان کو دیکھ کر پریشان ہو رہی تھی۔ عائشہ بی بی صحن کے ساتھ والے بند کمرے میں مولوی صاحب کی بیوی آمنہ کے ساتھ تھی۔ اس کمرے سے چینخوں کی آواز زور و قطار آ رہی تھی۔ یہ مولوی صاحب کی شادی کا تیسرا سال تھا اور ان کی بیوی تیسری دفعہ حاملہ ہو کر ان کا بچہ اس دنیا میں لا رہی تھی۔ آسمان پر موجود سورج کی روشنی مدھم ہو گئی تھی، دوپہر سے شام کا وقت آن پڑا تھا مگر مولوی صاحب کی دائیں سے بائیں چہل قدمی میں کوئی خلش آئی نہ عائشہ دائی کی بیٹی اپنی جگہ سے اٹھی۔
                جب سورج ان کے حالات دیکھ دیکھ کر تنگ آ گیااور دنیا کے دوسرے حصے کی جانب چلا گیا تواندھیرے سے لڑنے کو صحن کی تیز بتیاں جلا دی گئیں تب اندر سے آتی چینخوں کی آواز معصوم زندگی کی آماد کی نوید میں بدل گئی اور
                مولوی صاحب کے دل کو لکوا مار گیا۔ بیٹا ہوا ہو بس۔ وہ اپنے دل کی طرح رک گئے اور پر تجسس آنکھوں سے دروازہ دیکھنے لگے۔ دھرام سے دروازہ کھولتی عائشہ دائی باہر نکلیں۔ ان کے تاثرات کافی ان دیکھے تھے۔
                نہ خوش نہ اداس
                "بیٹی" مولوی صاحب نے پوچھا تو عائشہ دائی نے اپنی بیٹی کو آنکھوں سے جانے کا اشارہ کیا۔ وہ ماں کا حکم بجا لاتی ان ننھی بچیوں کے ساتھ وہاں سے چلی گئی۔
                "نہیں" وہ گئی تو عائشہ دائی بولیں
                "لڑکا؟" مولوی صاحب مسکرا اٹھے
                "نہیں" اور اب کے جو دل کچھ وقت قبل رک گیا تھا وہ یوں محسوس ہوتا تھا کہ زمین کے نیچے جہنم کو جاتے کسی گھڑے میں گر گیا ہو۔
                <br />
                (بیس سال بعد)
                <br />
                وہ آئینے کے سامنے بیٹھی تھی۔ جولائی کی گرم رات تھی۔ رات کے اندھیرے میں ڈوبے سورج کی چھوڑی گرمی اب آواز نکالتے پنکھے کی ہوااور رات کی ٹھنڈک میں حتم ہوتی چلی جا رہی تھی۔ اس کا عکس آئینے میں واضح نمودار ہوتا تھا۔ اس کی بہن پاس پڑے بستر پر سو رہی تھی۔ وہ ہاجرہ تھی۔ مولوی فضل الدین کی بڑی بیٹی۔ سفید رنگ، کھلے بڑے بال، کالی گہری آنکھیں، جو فی الوقت اس آئینے کی زینت بنے ہوئے تھے۔
                اس نے دراز کھولا اور کالے کپڑے کے اندر چھپا کر رکھا میک اپ کا سامان نکالا۔ سرخ لپ سٹک اٹھائی، اوپری ہونٹ کے بائیں کونے سے دائیں کونے اور پھر نچلے ہونٹ کے دائیں کونے سے بائیں کونے۔ اُوما اور پھر ان دونوں ہونٹوں کی مشترکہ حرکت سے نکلی آواز۔ پھر اس نے بیس لگایا، اس کے اوپر سرخ رنگ، پلکوں پر مسکارا، آنکھوں میں سرمہ۔ یہ وہ پارسا لڑکی نہیں تھی جس کو اس کے گھر میں آئے مہمان سارا دن دیکھتے تھے۔ نہیں۔ فی الوقت وہ ایچ جی تھی۔
                "ابو کو مرے ایک ہفتہ ہوا ہے" اس کی بہن مدیحہ جاگ گئی تھی "اور تم ہو کے-"
                "جس نے مرنا تھا وہ مر گیا، اب میں اس کے ماتم میں بیٹھ جاؤں تو بھوگے مر جائیں ہم" بس۔۔۔۔ اب ہاجرہ اپنی بہن کو مزید سننے والی نہیں تھی اور یہ بات مدیحہ کو بھی پتہ تھی تو وہ خاموش سو گئی۔ اور کمرے کے باہر رات کا کیڑا اپنی پی پی کرتا رہ گیا حتیٰ کہ صبح ہو گئی۔
                جب کسی گھر میں کوئی مرتا ہے تو ماتم ایک ہفتے میں کیا ایک مہینے میں بھی حتم نہیں ہوا کرتا تو یہ صبح بھی مرحوم مولوی کے گھر میں افسردہ ہی تھی۔ پھر مولوی صاحب کے گھر والوں کا دکھ تو تھا بھی بڑا نا آخر کو ان کا کسی نے قتل کیا تھا۔
                مولوی صاحب کا گھر جو مسجد سے دو گھر دور تھا وہ دو گھروں کا مجموعہ تھا۔ ایک میں ان کا خاندان رہتا تھا اور دوسرے میں ان کے بھائی کا۔ صبح کے نو بجنے کو تھے اور جولائی کا گرم سورج اپنی آب و تاب میں چمک رہا تھا۔ مولوی صاحب والا گھر کا حصہ بڑا عام سا تھا۔ دروازے کے ساتھ طویل صحن، اور گھر کے بالکل آخر پر چھوٹے سے تین کمرے۔ ایک میں مولوی صاحب اور ان کی بیوی آمنہ ، ایک میں ان کی بیٹیاں، اور ایک میں ان کی تیسری اولاد رہائش پذیر تھی۔
                البتہ ان کے بھائی کا حصہ جہاں جانے کا راستہ صحن کے درمیان میں بنایا گیا تھا، نسبتاً عالی شان تھا۔ دومنزلہ نئے طرز کی حویلیوں جیسے ڈیزائن کا گھر جس کے کمروں کی تعداد اس کے رہائشیوں سے زیادہ تھی اور ساتھ میں چھوٹا سا باغ تھا۔ اللہ دتہ شہر میں الیکٹرونکس کی دکان چلاتے تھے۔ ان کا ایک تئیس سال کا بیٹا تھا کامران، ایک بیس سال کی بیٹی تھی تانیہ، اور خدا کی نعمت کہ ایک سات سال کا بیٹا اور تھا عثمان۔ کامران اور ہاجرہ کا رشتہ عرصے دراز سے طے تھا۔ مولوی صاحب اور کامران کے علاوہ دنیا کا کوئی شخص نہیں تھا جو اس رشتے سے خوش تھا۔ اللہ دتہ کی بیوی نائیلہ کو مولوی صاحب زہر لگتے تھے۔ آج بھی اپنی نوکرانی کے سامنے ان کی برائیوں پر ڈٹی تھی۔
                "باجی ویسے کچھ پتہ چلا کہ کیا ہوا تھا، مطلب کے کون تھا جس نے" اس نے ہرے پھولدار کپڑوں میں ملبوس سانولی، چھڑی جیسی اپنی مالکن سے پوچھا۔
                "ارے چپ کرو" نائیلہ نے جلدی سے اسے چپ کروایا "ابھی تو شکر ہے ان کی بہنیں اور کزنیں آمنہ بھابھی کی خبر لینے کو گئی ہوئی ہیں ورنہ پھر ماتم شروع ہو جاتا"
                "ویسے یہ تو ہے" اس کی نوکرانی کالے رنگ کی بد صورت عورت تھی۔ پرفیکٹ فار آ میٹ۔
                "ہاں" کچھ لمحے خاموشی برقرار رہی "ہونا کیا تھا" پھر ٹوٹ گئی "مولوی صاحب کونسا کوئی دودھ کے دھلے تھے کسی نے لے لیا ہو گا بدلا"
                "کیا کہہ رہی ہو باجی"
                "ارے تم نے کونسا افواہیں سن نہیں رکھیں، پھر بھی چسکے لے رہی ہو۔ مولوی صاحب اکثر بچوں کو روک لیتے تھے اکیلے مسجد 
                ************************************************************************
            </p>
            <div className='viewContent_user'>
                <div className='viewContent_userDetail'>
                    <img src="./src/assets/logo.png" alt="" width={'60px'} />
                    <p>یوذر</p>
                </div>
                <button>فالو</button>
            </div>
            <div className="viewContent_comments">
                <div className='write_comment_div'>
                    <form action="" className='comment_form'>
                        <span
                            contentEditable
                            className='written_comment'
                            onClick={(e) => {
                                let checkText = e.target.innerText;
                                if (checkText == "اپنی رائیں ہمیں دیں") {
                                    e.target.innerText = ""
                                }
                            }}
                        >
                            اپنی رائیں ہمیں دیں
                        </span>
                        <button className="comment_button" type="submit">شائع کریں</button>
                    </form>
                    <p className='story_likes'>
                        <FontAwesomeIcon icon={faThumbsUp} className='searchIcon' />
                        21، لایکس</p>
                </div>
                <div className='posted_comments'>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />

                </div>
            </div>
        </div>
    )
}

export default ViewContent