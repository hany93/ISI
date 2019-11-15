import { Upload, Icon, message, Row, Col, Pagination } from 'antd';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { editFilePdf } from '../FetchServer';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { GlobalStylePagination } from './Styles';

function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

class Documento extends Component {
    state = {
        fileList: [],
        numPages: 0,
        pageNumber: 0,
        base64Pdf: ''
    };

    handleCustom = ({ onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    handleOnChangePag = page => {
        this.setState({
            pageNumber: page,
        });
    }

    handleOnChange = async info => {
        let status = info.file.status;
        if (status === 'done') {
            let fileList = [...info.fileList];
            getBase64(info.file.originFileObj, async (fileUrl) => {
                let datos = {
                    filelist: fileList,
                    fileUrl: fileUrl
                };
                var aa = await editFilePdf(datos);
                this.setState({ base64Pdf: aa['data'], pageNumber: 1 });
            }
            );
            message.success('El archivo ha sido cargado satisfactoriamente.');
        } else if (status === 'error') {
            message.error(`El archivo no ha sido cargado satisfactoriamente..`);
        }
        this.setState({ fileList: [...info.fileList] });
    }

    handleOnRemove = () => {
        this.setState({ base64Pdf: '', pageNumber: 0, numPages: 0 });
    }

    render() {
        const Dragger = Upload.Dragger;
        const props = {
            name: 'file',
            accept: 'application/pdf',
            onChange: this.handleOnChange,
            onRemove: this.handleOnRemove,
        };
        const { fileList, numPages, pageNumber, base64Pdf } = this.state;
        return (
            <div>
                <Row>
                    <Col span={15} push={9}>
                        <Row>
                            <Col span={15} push={8}>
                                <GlobalStylePagination>
                                    <Pagination defaultCurrent={1} total={parseInt(numPages + "0")} onChange={this.handleOnChangePag} />
                                </GlobalStylePagination>
                            </Col>
                            <Col span={8} pull={15}>
                                <h2>Archivo PDF (Página {pageNumber} de {numPages})</h2>
                            </Col>
                        </Row>
                        <Row>
                            <div style={{ overflow: 'auto' }}>
                                <Document
                                    file={`data:application/pdf;base64,${base64Pdf}`}
                                    error="No existe archivo."
                                    onLoadSuccess={this.onDocumentLoadSuccess}>
                                    <Page width={1000} pageNumber={pageNumber}/>
                                </Document>
                            </div>
                        </Row>
                    </Col>
                    <Col span={8} pull={15}>
                        <Dragger {...props}
                            fileList={fileList}
                            customRequest={this.handleCustom}
                            disabled={fileList.length === 1}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click o Arrastrar el archivo a esta área</p>
                            <p className="ant-upload-hint">Puede seleccionar un solo archivo.</p>
                        </Dragger>
                        <hr />
                    </Col>
                </Row>
            </div>
        );
    }
}
export default withRouter(Documento);