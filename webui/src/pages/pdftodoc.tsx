import { Upload, message as Mmessage } from 'antd'


const { Dragger } = Upload;


export default function Pdftodoc(props: any) {


    const uploadProps: any = {
        name: 'file',
        multiple: true,
        action: 'http://localhost:30746/index.aspx',
        onDownload(file: any) {
            debugger;
        },
        showUploadList: (file: any) => {
            debugger;
        },
        customRequest(option: any) {

            const getError = (option: any, xhr: any) => {
                var msg = "cannot ".concat(option.method, " ").concat(option.action, " ").concat(xhr.status, "'");
                var err: any = new Error(msg);
                err.status = xhr.status;
                err.method = option.method;
                err.url = option.action;
                return err;
            }

            const getBody = (xhr: any) => {
                debugger;
                if (xhr.responseType && xhr.responseType !== 'text') {
                    return xhr.response;
                }
                var text = xhr.responseText || xhr.response;

                if (!text) {
                    return text;
                }

                try {
                    return JSON.parse(text);
                } catch (e) {
                    return text;
                }
            }

            // eslint-disable-next-line no-undef
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';

            if (option.onProgress && xhr.upload) {
                xhr.upload.onprogress = function progress(e: any) {
                    if (e.total > 0) {
                        e.percent = e.loaded / e.total * 100;
                    }

                    option.onProgress(e);
                };
            } // eslint-disable-next-line no-undef


            var formData = new FormData();

            if (option.data) {
                Object.keys(option.data).forEach(function (key) {
                    var value = option.data[key]; // support key-value array data

                    if (Array.isArray(value)) {
                        value.forEach(function (item) {
                            // { list: [ 11, 22 ] }
                            // formData.append('list[]', 11);
                            formData.append("".concat(key, "[]"), item);
                        });
                        return;
                    }

                    formData.append(key, option.data[key]);
                });
            } // eslint-disable-next-line no-undef


            if (option.file instanceof Blob) {
                formData.append(option.filename, option.file, option.file.name);
            } else {
                formData.append(option.filename, option.file);
            }

            xhr.onerror = function error(e) {
                option.onError(e);
            };

            xhr.onload = function onload() {
                // allow success when 2xx status
                // see https://github.com/react-component/upload/issues/34
                if (xhr.status < 200 || xhr.status >= 300) {
                    return option.onError(getError(option, xhr), getBody(xhr));
                }

                return option.onSuccess(getBody(xhr), xhr);
            };

            xhr.open(option.method, option.action, true); // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179

            if (option.withCredentials && 'withCredentials' in xhr) {
                xhr.withCredentials = true;
            }

            var headers = option.headers || {}; // when set headers['X-Requested-With'] = null , can close default XHR header
            // see https://github.com/react-component/upload/issues/33

            if (headers['X-Requested-With'] !== null) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }

            Object.keys(headers).forEach(function (h) {
                if (headers[h] !== null) {
                    xhr.setRequestHeader(h, headers[h]);
                }
            });
            xhr.send(formData);
            return {
                abort: function abort() {
                    xhr.abort();
                }
            };
        },
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                console.log('blob_url', window.URL.createObjectURL(info.file.response));
                Mmessage.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                Mmessage.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };



    return <div data-v-b39fcbc8="" style={{ background: "rgb(245, 245, 245)" }}>
        <div data-v-b39fcbc8="" className="section-table-err err_div" style={{ display: "none" }}>
            <div data-v-b39fcbc8="" className="section-table-err-o"><img data-v-b39fcbc8=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA2UlEQVR42mL4//8/AxbMA8RpQLwNiF/9R4BXULE0qBoMvdgMSwbiN/8JgzdQtTgNZAPixf9JB4uhejEMJMcwZENRDEzGo/g+EMtC8X086pJhBvIQCLMNSL7YQCBMeZgYGBiigFiYgXIAMiMKZGAAA/VAAMhAEyoaaAIyUJSKBooyMVAZsADxawKu1AdiCSQ2PvAa5MIzBBQpAPFzKFYgoPYMyMANBBT9A+IWIO4nwscbiEnYO5ES9llCCZuYrAdSqAfEFkD8mZisR5PCgSbFF9ULWKpUAQABBgA/ZG+/RGbh8gAAAABJRU5ErkJggg=="
                alt="感叹号" /><span data-v-b39fcbc8=""></span><i data-v-b39fcbc8=""></i></div>
        </div>
        <div data-v-b39fcbc8="" className="dropzone_height">
            <div data-v-b39fcbc8="" className="upload-dropzone-t" style={{ height: "100%", top: 0, marginTop: 0 }}>
                <Dragger {...uploadProps} style={{ border: 0 }}>
                    <div data-v-b39fcbc8="" className="content-img"><img data-v-b39fcbc8=""
                        src="data:image/png;base64,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"
                        alt="PDF转Word" />
                        <div data-v-b39fcbc8="" className="content-i"><span data-v-b39fcbc8="" className="sp_l">PDF</span><span
                            data-v-b39fcbc8="" className="sp_r">Word</span></div>
                    </div>
                    <div data-v-b39fcbc8="" style={{ position: "relative" }}>
                        <div data-v-b39fcbc8="" className="upload-btn dropzone-previews dz-clickable">选择文件</div>
                        <div data-v-b39fcbc8="" className="select-file"></div>
                    </div>
                    <div data-v-b39fcbc8="" className="upload-text">
                        <p data-v-b39fcbc8="">一次上传最多支持10个文件、支持PDF格式</p>
                    </div>
                </Dragger>
            </div>
            <div data-v-b39fcbc8="" className="guide">
                <p data-v-b39fcbc8="">如果您的文档包含扫描页面，请联系人工转换</p>
            </div>
        </div>
        <div data-v-b39fcbc8="" className="content-icon clear content-icon-ul">
            <ul data-v-b39fcbc8="">
                <li data-v-b39fcbc8=""><img data-v-b39fcbc8=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADfElEQVR42tSaW4gNcRzH/2dsQoeTywMhq3VZrLSbB1IsK15QRLK7iJVbkjxIrNI+8cCD7CLrunYTkqKwKw7KdYU82D0ukS2SsKxLaju+P+c3NY2Zs+f85z+3b31qdtq5fGb+85//738m0tTUJBQlD0wHhSAf5IJ+IAqSoAN8Bm/Ac/AIxPlvx8lxuP0osBQsYZF06cvQ/5UY1idAA6gDr2VPRJPcbhK4CFpBZQYSXV2MneAlOA+KvBAZCs6Cu2COUJsImM9Nrh4McktkFWgBC4X7KeVjlasU6cVt+DAve5U+/NzUgu5ORajXucYPs1+pAFdBTFakP7gJJgv/U8wXNJatCDWhS6BABCcTwQW7ZmYncpS72KCF7kxNpiJrwWIR3FRY9WZmkWFgrwh+qsHAdCL7QM8QiFDXvMdOZCqYJ8KTUh6g/ieyTYQvlWaRcWB2CEVobDbcKLJMhDMRvQfTRcp8PqH7PIyXSZkuMgYM9lFiN798J4AbEtuPpvJCM1Vrfkhs5eWfXOP8kNhPiSZbkSnIfoOE8er2kNhXIYmM9EHiINhoWjceNIJuMs3LDxGSWM8zK0aJ62CA7AwOifSW3LgZTAHbHUoUOJSgxHIky9d3YCZoB3fAF7vhtSFHLCRGgCsOJShR2emgBEvoOcAnaReq+ddYSMQVdf1JTba7A+tM6+xkGnjk0OmSBKWDRL5LblyTgYwXEpR2ekZemIuULGV0AWFapo5guQcSlFcaiziJ3Z0pN0kM4feEG8OhVhJ5qGBHVjLCJBHXh9wupFnjAwgXZXSJPOFe4iTSwu8FN2S8kKDzb9PfI6cU7phkdoBZHkhQ6oyF1UnFO68SqflatyXoBVtvFKHbczmEpe4Z8NY8i1IVQpFdVtNB98C5EEmcAE+sRCibJcdeXucr2GJcoVkMzzeFQIS6+I/pRCi1irtj1TkETptX2tUjq8HtAEo0WtT6aUV+gbngaYAkHoAF4E82IoIrwGngVkDuxIx0HVFXpS7J0OT2cR8lqrl1pO1NM6nZf4MVIvXNyTcPBWhCYxHYYNecshURhoFlPpevbueYSH2jkvELOttZlPciNftdxAdJKjz5Tu5WaZ5rJfiUzcaynzk95tuey2L0M9hYyX094xEs0SZ7FSIKPzyjIqqY7xY1C5qKjTL/pmz4GaPfQRJcYlO98kHFwf8KMADmXLYXVLAbUgAAAABJRU5ErkJggg==" /><span
                        data-v-b39fcbc8="" className="">拖拽或选择PDF文件</span><img data-v-b39fcbc8=""
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAGCAYAAAB+dujoAAAAk0lEQVR42mL8//8/w0gEe/bsEQJS24C40sXFZT+6PBPDCAXAwHgHpFyBeCUwkArR5RlHaopBSjkcQOoWEB8B4hRggH0b0SkGKeX8AFKKUHwCGFBK4BRz5swZoaHmmX///jF9/PjxHZUC5h805bABqePQAIpi3Ldv3x9gdhpSKYcRCICB851KxcB3KM0JxSDwHiDAAALIOQzbod1EAAAAAElFTkSuQmCC"
                            className="content-icon-i content-icon-s" /></li>
                <li data-v-b39fcbc8=""><img data-v-b39fcbc8=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAA81BMVEW7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u9vb2/v7/BwcHExMTGxsbLy8vOzs7T09PX19fd3d3f39/h4eHn5+fq6urw8PD29vb5+fn7+/v9/f3+/v7///8v5QKhAAAAO3RSTlMABgoMFhodHh8gISIvMDIzVVZXWF5fY3t9goOSk5SWl5igoaWqsLm6vL3G1dbX2drc7O3u7/H4+fr9/nnFrYMAAAGeSURBVEjHpZZnV8IwFEBTtjJEGaLs1QooIFQZQTbIJv//11iLnKYjo/V+a8g954W89/IAMOGLp8Vm57PXaYrpuA8w8acaUEcjFaAKocoAmhhUQkTBUxxCS4ZFj7URlSEROWohCDlIJS8YDbcIGYhuveGqQyZ1ly6qGuTgBY8tB7nIa8YD5CR2NbwyryJ7/5Qy5KZ8MSJDfmUYUZUqccN6Ylqq/hqBAVHZHmamHL1VlEdyGFt0WhjXnhTllaYgtDKsNZUahHQFbUb6xSBIsBS0G+sWkyCjfXwb2asK2k9xJQOwpEckjnNMkUCbQ0HnpbarDT60jy8K2q53AO3Sc6JggU0oaLs6+PGXZ/IfgB8f7yzzI4ci4VcJ4fR6eaZbxa9SnzDjnapsKcdPGtNytGEpQXPyr+hKy6rEFiea8qwoN6ZCnh3IilrIFu1isiYqarsAd/abkoPW56TBgpjtNg5Ans8o2H6SasL/Hj4nz6sSW4FxDsHuqHBPGEhKpIGk5CFOMWHrsSfMGK4M9fPGGK4uViIrtbr9frclZRN+8+8/zYbSQ/VMa84AAAAASUVORK5CYII=" /><span
                        data-v-b39fcbc8="" className="">点击开始转换成Word</span><img data-v-b39fcbc8=""
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAGCAYAAAB+dujoAAAAk0lEQVR42mL8//8/w0gEe/bsEQJS24C40sXFZT+6PBPDCAXAwHgHpFyBeCUwkArR5RlHaopBSjkcQOoWEB8B4hRggH0b0SkGKeX8AFKKUHwCGFBK4BRz5swZoaHmmX///jF9/PjxHZUC5h805bABqePQAIpi3Ldv3x9gdhpSKYcRCICB851KxcB3KM0JxSDwHiDAAALIOQzbod1EAAAAAElFTkSuQmCC"
                            className="content-icon-i content-icon-s" /></li>
                <li data-v-b39fcbc8=""><img data-v-b39fcbc8=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAABC1BMVEW7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u8vLy9vb2/v7/AwMDFxcXGxsbHx8fIyMjLy8vMzMzOzs7V1dXW1tbX19fZ2dnd3d3f39/g4ODh4eHp6enq6urs7Ozx8fHy8vLz8/P4+Pj8/Pz9/f3///8lyr8LAAAAO3RSTlMABgoMFhodHh8gISIvMDIzVVZXWF5fY3t9goOSk5SWl5igoaWqsLm6vL3G1dbX2drc7O3u7/H4+fr9/nnFrYMAAAGxSURBVEjHpdbZVsIwEAbgsKMsolBE2XcBBWQRykhBEUXcQEXz/k9ioWJpktIG/6sc5nyHpE2TQYiKMxQtVBtXnUa1EA05kWFckQpoUom4twJvTgQqYs6rC+zpHjDTS9vZItAC3bQCDGBJwNYkLaSwFcAgBZtWWMtgmLJVM6sSmMjZ5twSYCpJVRyByQTXwtEyS1qOX5IF08kqwt8zT3r+FcnTFQmvMqYr+aVwizxE3JfJMfAQOJHJOR+pyt8g8BHwIIGXhFGMl8QQvemHo9GdQiaj0S1VLqI69dsD3sgLVa6jNv3Xb6r46FPVS8SY7WCxFt83dLXDIjBek0dgkTbLPCtixqo1GMuXc/2+FIsBq1YnHrIkKesdfsnkfjXsSxLxkLWvEuOpMphg/KqMphgTr1JgE5h99tkkTGxLlQyGwCYeYvOr5C8EqZGfGMbzJyJzLTmVyZ6oIayQH7LmuDAkq+MCHfAfSjscfbscsCjIfYwjlDQnUtxXUsnyv4tvl+tVnlvKYB0W3lbhUKchyeg1JBm7bhfjY7c9PoPmirg8LgyaK0UJ8WKt2e02a8W44KLrP7Ni2PXLH0iTAAAAAElFTkSuQmCC" /><span
                        data-v-b39fcbc8="" className="">PDF转换完成，下载Word文件</span></li>
            </ul>
        </div>
        <div data-v-b39fcbc8="" className="content-list clear">
            <div data-v-b39fcbc8="" className="cont-listtit"><i data-v-b39fcbc8=""></i>
                <h1 data-v-b39fcbc8="">在线PDF转Word</h1>
                <div data-v-b39fcbc8="" className="clear"></div>
            </div>
            <div data-v-b39fcbc8="" className="content-list-r">
                <ul data-v-b39fcbc8="">
                    <li data-v-b39fcbc8=""><img data-v-b39fcbc8=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAA8CAYAAAAwoHcgAAACvUlEQVR42uybS2jUUBSGTzRWEVFBCoLdKIJgLdSNiCDFutatdqEiqI2C0uBCcGEXgiiWZicB3YgPfMyiiODG16AggqJUFyKuChVUEF0oWGzH/87NjJM0M0kqLube/8B3p5CkcL9mzj33UadSqQgjHvOogFIohVIo5f+Gm/vOwGu3vi0DL6Kf94sfPuWbIrIarI0o4496FnTw6xPv5wnwHGK6KSUeveAlxAwBh1L+xkKVIcF9iOmilHj0gzcQM5C84FRGB5ficx9YYVinV4LBnPfeAIcxQn2rSXmMzz5WJzJZfTn88IGSwmlyPIZZ0c6OIUqJx3dwyKWHepTBXuSUiWZSvihjBpT5oznumwInq7WLH860mhD+xA1jbT4h7M1xzzjYg76Os3gTUSPuebApKaTY0oE5MRHljjLnPjqugJ5WQkx/UxqL0q/Vkt8PS3keNFnKO3ALqBHlOIR8zPVU4C0wWcovsKvQE3plrsSKNiEE7KCUhBCb65RGIYvRjtWEtEq0Dy0Schdsy6pTroODlrwnN5NC0qRci6q9aUuk9GRVtGE0ObJFiGSV+UrIEQjh0mQkhUJSpBQRsh48AvdAh6lS3FxC9BbjMXBO9A6binWiNpOMlJItZBXay2B74sp80xNtMyG70b5NEWJ0uE1kLEd7AQzYmGjdFCH90dely9bRx6kfLg68RWjPAD/ns8Oi1zvbOUYk5WCBlhJ4ajvgKugWBhJt4B0VdeyJQmKjz4jJhdhcpajcMEMV9Ziq5ZQtovdE1tCJ3G4cfZaIPiB3oEDmnjRMyCdQcmb9v0/g7UR7CXRm/IKN4HXbdNcP/6HM98M7aDeIXru0NtGmWf0M1Oq2OqPyg1Lici6KPufxjFLiYj6g3QpOgd8NV6btlaLFKAGnwWbwCjwB782fEDIKvimUwqAUSqGUOccfAQYARaixp98+z7YAAAAASUVORK5CYII="
                        alt="PDF转Word效果" />
                        <p data-v-b39fcbc8="" className="content-list-r-title">转换效果</p>
                        <p data-v-b39fcbc8="" style={{ textIndent: 0, paddingLeft: 30, paddingRight: 30, margin: 0, display: "inline-block" }}>
                            PDF转Word功能可快速直接地在线PDF转换成Word文档，超高的PDF在线转化精准度，保留原文档的布局和格式。</p>
                    </li>
                    <li data-v-b39fcbc8=""><img data-v-b39fcbc8=""
                        src="data:image/png;base64,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"
                        alt="PDF转Word速度" />
                        <p data-v-b39fcbc8="" className="content-list-r-title">转换速度</p>
                        <p data-v-b39fcbc8="" style={{ textIndent: 0, paddingLeft: 30, paddingRight: 30, margin: 0, display: "inline-block" }}>
                            上传PDF文档后，仅需数秒便将PDF转换成Word。</p>
                    </li>
                    <li data-v-b39fcbc8=""><img data-v-b39fcbc8=""
                        src="data:image/png;base64,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"
                        alt="PDF转Word适用系统" />
                        <p data-v-b39fcbc8="" className="content-list-r-title">适用系统</p>
                        <p data-v-b39fcbc8="" style={{ textIndent: 0, paddingLeft: 30, paddingRight: 30, margin: 0, display: "inline-block" }}>
                            PDF转Word功能适用于所有计算机，包括Mac、Windows及Linux，无拘无束体验在线PDF转换成Word文档。</p>
                    </li>
                    <li data-v-b39fcbc8=""><img data-v-b39fcbc8=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAA8CAYAAAAwoHcgAAAFhElEQVR42uyaC4hUVRjH7262tmmuUNnTSiqy1MrQWC0qe6yPsDdEiam9HKPSCSuKLMgCC2IKesyqpZk9fERBDy2VKEOxl7Wl0YMktZebxZblrq5O/2/nP3A8nZ255+49s3vh/OEHc+/dvXPnf75zvu98MxW5XC7w2lcV3hRvijfFm+JN8aZ4U7wpiTMlk3L93kPAKDAMDACHgB68tg18Dz4GK8C7YLfV3dPZyA/WrcyDIO93A7iNRrSnPmQ4mAq2g3oZKvC764esLKMhdWADyJYwxKSDwb2Mnlskwl2PnGvtBx4Fd7RzPccPuwX8DQ4A/cAJhkGrAU+BMWAcaEqiKVXgFXC54dpyMA+8086HEwNGg0mMMlUXgw/B+aAxSdNHQny+wZC14Ex+4MVFRruJho4EteBT7fpAsBIclCRT7gTXaOdkGp3DrGKjdcxST2jnT6XxiTDlFPCQdu4ecDdojXhPScnTwH3a+SvAdV3VlN5KVngM7K9cexrMiul9HgbPGyKwZ1cwRYqtB0ED2AX+5Gh+xKKsoI1FMk9U3Qo2K8eHgcmdbcrN4AcwAwxSokLS71Dtb6eDlphN2cG6RdWUzjRlBqvLMKu+ZJpljtatReAn5fh4w4CUxZSRnDKqdnJ/sgC8Cf5Srt3vMLu1MqWruqDcxVslF1BVLzAj/KGc6w7OA/+wwHKp92TrpxwPLbcptdqe5TUwgWW6qhZWqeXQV9qxFIWXgVXcMjifPhcairO4mzESYevBTC7apbRFq3uO5mBtCzKpheA01/2UemadwsMc42DkPwODuU5Jyh0LvgsRLQOKbDafbcuA6WyTi0jRd74uVM+wrwYncTswrUSrQHozXxTZf93Ytm/KpE52Ycom5fWR4ERHplwEfmYhWMPtgqT2I4ostqeDvmxgvQr2aH8j6foDGDMoTlMqOHqqxjuKlnU0fDGjpgcX0A2GDaaqreA5cBVNWGqowJfDmMPjWFNq+IB1hn7I6CL3PpCZoKoDBo1i66EbB1Aq2ffBtVo99H9JjzaTuinId/rUwV/RVm+ls7moKVkMWc1SXlUzeLLE/77EZlCcjayeNGoBDQ9KGDMHxrQyggqS6XmlIZJCTR+ZMksMhqxkg+etEo/UzI1iiwP+DW1jOjuPA6TqAZhVESVSJtNVtay+HTwT8nHGs7bpHvOa08KBsdF0rjWFqTyQTas14U3JpKrb3NxXE8GLlk0hV5tBO6Wzv+AzvcwKXG1OrbGZPpcCdZWeb2lIV9Qb2vFZtmvKJcrrvWwXJF1647u/7ZpSqxVHWyM8hKxJjxgKqY5Kqum7wGzL//tNO+5ta8pRyutPIj78RKZ0F7o+gim7tOO9tqaoBVfU725lNF/niFRycyZp8Eem66jawSxoq76GCtjKFMkchb7roREffjU3dVLrDGHhtYfbhQmsTMup4dpxg+1C+63yenAHHkSibESQ7+Y3cT3ow0yQdVDDFNM4QxFqZcpa5fUIbqY6ojlB/tu8Blaj0vSW74i/CfJfpLtVJiWROkY5IxG7yNaUJdoUiyMlb2bUzeJmTtatYw0leNyGyHSdq51diILuV1tTJLS+Vo7ly6c4OuWy4s/k/N7E1sAqh4ZUMSLUtuROQ7UeunUgbYG3lTMyulezZRCHZEDkxziNjiw5jlE4TDs/BVGSjdpkWqZt/nrRJNmG94spahodmSFF40aDIdlShoTpp0g9IB3ysUo7YRL5HHwZ5FuHzUHnqhdLB1mz2mtiyy+gpoa5WZjOm6TRx7muJFFS7KURIXNt5nUpSfqSjnkdoyMp2s2tQH8bQ8JMH1XS2zwDnBvk23lns2Kt7iImtHILsZ7ZcynM2B7lRv4X194Ub4o3xZviTfGmeFO8Kd6UZOs/AQYAiGx/kD+B/BYAAAAASUVORK5CYII="
                        alt="在线PDF转换" />
                        <p data-v-b39fcbc8="" className="content-list-r-title">云端转换</p>
                        <p data-v-b39fcbc8="" style={{ textIndent: 0, paddingLeft: 30, paddingRight: 30, margin: 0, display: "inline-block" }}>
                            拥有多个PDF转Word文档的云端服务器，支持批量在线PDF转换成Word文档，并稳定输出。</p>
                    </li>
                    <li data-v-b39fcbc8=""><img data-v-b39fcbc8=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAA8CAMAAAAHfocSAAABa1BMVEX/jmf/////jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmf/jmcxB+tfAAAAeHRSTlMAAAECAwQFBgcMDhESExQVFhcYGRobHR4fICEjJCUmJygpKissLTI0NTc4OTtBQkVJUlZXWFpbXF1fYGFiZGVmZ2htbniNj5aaoKGosLG8vb/AwcLDxMXGx8rMzs/R09jZ3t/g4uPl5ufp6uvs7u/w8vP3+Pn6/P36LQ4RAAADCElEQVRYw+2XaVvaQBCAaSR4QIMXHsEDYgVUWjwIUVtP8MSDCIhotSAaBUU8Ku7P7yx5LCBsCJB+63xh2Z15k9mdmZ3oPmHRkYXy5XI+SkGhYF+LMhZFKDrWLGXyAqGLyf+Uj2IXERLt9VHoSq1FSVqsnKXJFP34vKtVp0JaXfPjegKF+vKK8ktttSFtS3n0e4yqTqEXEELPyzUxbcvPoLhAE97F9QCrLyslThlMFtZqZS0mQ4k7Ky+g9uAivIuOXseY3Nf3FLI4V3djqUwmFdtddVrek+lbDkPWafIZ+bPgU0Aesz445KKIPlaeD4A/Wb9ivPivH+NTeGCcO0cf5HzOiFem4o/X/hpR5wlM4B/rlmz5mk4mEsn0q/xvy4rXJgIedbHrOCxYXYmbvJvj3PymeFWYOHTUkQGOE2xyG5wuTk0Hb/HciUM1hT3ABnFv+aw3jmcPWJWU9m3Qzu+NfHzqyF4eFrbbVVFoL+i+7fdWBm3v/hsseWk1lP4zUD21VYt92yksnfWroBgE0MzOVE+hGYhKJBhqU7ojsClBUiYGYWsi3QQKNwkiO+GEp0keEsUjwbJTdg/bcCUUPvoLJCxgh9ZALdRCorSEYHkNuySEsU2UL1Ke5ABPQ00w7UDYb5CLywYkw44J6kNatnkqUrLyjAQFyhIDGk+m8GAds0CpkmSbbJEihH+ChL6D1mAKoaSbTHEnEUoNwuBHCNuEhZLdHXWBDGOtoTuEEhyZwiUQuhvCo2FsM1r9pNVTlOJFtUeKFLW7q0xRe9LKlELUiXoSRC++R51yHuEMuCFnwM3fDPhX2ah5ZdCmSmlUMbWp3hrdJBrdahrdsMq3fR2dKrnzqK/fZYXqXVCdXXOLxbW2U9mR1d97Ux1dfQMDfV0dVOMdPNXTaWY+gzDmzh6qQYpweV0il0JDFNtx+REd2xqhcPFySpxrhELPSqUQaZZuaF8MJjPDyLvLMGaToYmvLJ2RYYy6Jr/VhMwTSEZoimI/kjflyN4MxRaRKRFbMxSKv38DueeVM+APxcs5tWsAEhEAAAAASUVORK5CYII="
                        alt="温馨提示" />
                        <p data-v-b39fcbc8="" className="content-list-r-title">温馨提示</p>
                        <p data-v-b39fcbc8="" style={{ textIndent: 0, paddingLeft: 30, paddingRight: 30, margin: 0, display: "inline-block" }}>
                            扫描的图片型PDF转换后还是图片，不能修改和编辑。若要识别扫描件和图片，请联系人工转换</p>
                    </li>
                </ul>
            </div>
        </div>
        <div data-v-b39fcbc8="" className="content-b-hot clear"><i data-v-b39fcbc8=""></i>
            <p data-v-b39fcbc8="">热门功能</p>
            <div data-v-b39fcbc8="" className="clear" style={{ overflow: "hidden" }}>
                <div data-v-b39fcbc8="" className="Hot-Item"><a data-v-b39fcbc8="" href="https://www.pdf365.cn/pdf-to-word/"
                    target="_blank" title="PDF转Word">PDF转Word</a><span data-v-b39fcbc8="" className="split">|</span><a
                        data-v-b39fcbc8="" href="https://www.pdf365.cn/pdf-to-jpg/" target="_blank"
                        title="PDF转图片">PDF转图片</a><span data-v-b39fcbc8="" className="split">|</span><a data-v-b39fcbc8=""
                            href="https://www.pdf365.cn/pdf-merge/" target="_blank" title="PDF合并">PDF合并</a><span
                                data-v-b39fcbc8="" className="split">|</span><a data-v-b39fcbc8=""
                                    href="https://www.pdf365.cn/pdf-to-ppt/" target="_blank" title="PDF转PPT">PDF转PPT</a><span
                                        data-v-b39fcbc8="" className="split">|</span><a data-v-b39fcbc8=""
                                            href="https://www.pdf365.cn/pdf-to-excel/" target="_blank" title="PDF转Excel">PDF转Excel</a><span
                                                data-v-b39fcbc8="" className="split">|</span><a data-v-b39fcbc8=""
                                                    href="https://www.pdf365.cn/jpg-to-pdf/" target="_blank" title="图片转PDF">图片转PDF</a><span
                                                        data-v-b39fcbc8="" className="split">|</span><a data-v-b39fcbc8=""
                                                            href="https://www.pdf365.cn/word-to-pdf/" target="_blank" title="Word转PDF">Word转PDF</a><span
                                                                data-v-b39fcbc8="" className="split">|</span><a data-v-b39fcbc8=""
                                                                    href="https://www.pdf365.cn/pdf-split/" target="_blank" title="PDF拆分">PDF拆分</a></div>
            </div>
        </div>
    </div>;
}