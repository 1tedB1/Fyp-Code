import React from 'react'
// import Card from "Card";
import Cards from './Cards';
import Card from "./Card";

function LandPage() {


    return (
        <div className="landPage">
            <div className="firstHalf">
                <div className='writtenPart'>
                    <h1 className='first--intro'>
                        انداز بیاں گرچہ بہت شوخ نہیں ہے
                    </h1>
                    <p>وہ جگہ جہاں سے آپ کا ادبی سفر شروع ہوتا ہے
                        اپنے خوبصورت الفاظ کو پوری دنیا کے ساتھ شیئر کریں۔
                        تو آپ کس چیز کا انتظار کر رہے ہیں؟
                        چلو شروع کریں
                    </p>
                    <form action="" className='emailForm'>
                        <input type="text" placeholder='اپنا ای میل درج کریں۔' className='emailInput' />
                        <button type="submit" className='emailButton'>شروع کریں
                        </button>
                    </form>
                </div>

                <img className="firstImage" src="src\assets\firstIntroBook.jpg" alt="book" width='500' height='400' />
            </div>
            {/* different options */}
            <div className='secondHalf'>
                <h1 className='headings secondHeading'>
                    آپ کو کیا پسند ہے. ہمارے پاس یہ سب ہے
                </h1>
                <Cards />
            </div>
            {/* testimonial */}
            <div className="thirdHalf testimonial">
                <h1 className='headings thirdHeading'>
                لوگ ہمارے بارے میں کیا کہہ رہے ہیں
                </h1>
                <Card 
                className="test1" 
                imgPath={"./src/assets/book.jpg"} 
                text={"اس ویب سائٹ نے مجھے اردو زبان میں معیاری مواد پڑھنے اور خود بھی لکھنے کا بہترین پلیٹ فارم فراہم کیا۔                ویب سائٹ کا انٹرفیس بہت ہی دوستانہ اور ستعمال میں آسان ہے۔ مختلف موضوعات پر بلاگز کو پڑھنا اور نئے بلاگ پوسٹس کو ڈھونڈنا بے حد آسان ہے۔ ہر بلاگ کا ڈیزائن صاف ستھرا اور دلکش ہے، جو قاری کو مواد پر مرکوز رہنے میں مدد دیتا ہے۔"}>

                </Card>
        </div>

        </div >
    )
}

export default LandPage