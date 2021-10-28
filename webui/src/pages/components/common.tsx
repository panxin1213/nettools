import { Link } from 'umi';

export default function Common() {

    return <div data-v-b39fcbc8="" className="content-b-hot clear"><i data-v-b39fcbc8=""></i>
        <p data-v-b39fcbc8="">热门功能</p>
        <div data-v-b39fcbc8="" className="clear" style={{ overflow: "hidden" }}>
            <div data-v-b39fcbc8="" className="Hot-Item">
                <Link to="/pdftodoc" data-v-b39fcbc8="">PDF转Word</Link>
                <span data-v-b39fcbc8="" className="split">|</span>
                <Link data-v-b39fcbc8="" to="/pdftoxls" >PDF转Excel</Link>
                <span data-v-b39fcbc8="" className="split">|</span>
                <Link data-v-b39fcbc8="" to="/pdftoppt" >PDF转PPT</Link>
                <span data-v-b39fcbc8="" className="split">|</span>
                <Link data-v-b39fcbc8="" to="/pdftohtml" >PDF转HTML</Link>
                <span data-v-b39fcbc8="" className="split">|</span>
                <Link data-v-b39fcbc8="" to="/pdftozip" >PDF转图片</Link>
            </div>
        </div>
    </div>
}