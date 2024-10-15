import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';

const MultipleQRCodesWithPDF = () => {
  const [qrCodeData, setQrCodeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputFileName, setInputFileName] = useState('');
  const qrCardRefs = useRef([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setInputFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const qrCodeRows = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        excelData.slice(1).forEach((row) => {
          const code = row[1]; // code
          const url = row[2]; // URL
          if (code && url) {
            qrCodeRows.push({ code, url });
          }
        });
      });

      setQrCodeData(qrCodeRows);
      setIsModalOpen(true);
    };
    reader.readAsArrayBuffer(file);
  };



const downloadQRCodesAsPDF = async () => {
    if (qrCodeData.length === 0) return;
  
    setIsLoading(true);
    const pdf = new jsPDF('portrait', 'mm', 'a4'); // A4 PDF size (210mm x 297mm)
  
    // Define QR code image size in mm (5 cm x 7 cm)
    const qrWidth = 50; // 5 cm in mm
    const qrHeight = 70; // 7 cm in mm
  
    // Margin (10px) in mm
    const margin = 5; // 10px ≈ 2.645mm
  
    // Calculate the actual content size with margin (QR code and text)
    const contentWidth = qrWidth - 2 * margin; // Subtract margin from both sides
    const contentHeight = qrHeight - 2 * margin;
  
    // Calculate positions to center the QR code + margin on an A4 page
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const xPos = (pageWidth - qrWidth) / 2; // Center horizontally
    const yPos = (pageHeight - qrHeight) / 2; // Center vertically
  
    for (let i = 0; i < qrCodeData.length; i++) {
      const qrCardRef = qrCardRefs.current[i];
      await new Promise((resolve) => {
        html2canvas(qrCardRef, {
          width: qrCardRef.offsetWidth,
          height: qrCardRef.offsetHeight,
          backgroundColor: '#ffffff',
          scale: 1,
        }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
  
          // Add a new page for each QR code except the first
          if (i > 0) {
            pdf.addPage();
          }
  
          // Add the content with the margin to the PDF
          pdf.addImage(imgData, 'PNG', xPos + margin, yPos + margin, contentWidth, contentHeight);
          resolve();
        });
      });
    }
  
    // pdf.save('qr-codes.pdf');
   pdf.save(`${inputFileName}_qr-codes.pdf`);
    setIsLoading(false);
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="relative h-900px mt-10 flex items-center bg-white-500 justify-center bg-cover"
    >
      <div className="sm:max-w-lg w-full p-10 bg-white shadow-md border-2 rounded-xl z-10">
        <div className="text-center">
          <h2 className=" mb-4 text-3xl font-bold text-gray-900">Multiple QR Code Generator</h2>
        </div>

        <div className="grid grid-cols-1 space-y-2">
          <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
              <div className="h-full w-full text-center flex flex-col items-center justify-center">
                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                  <img
                    className="has-mask mt-10 h-26 object-center"
                    src="https://meetanshi.com/media/catalog/product/cache/462685a296595c72e220ca4ed4abc3df/m/2/m2-product-qr-code-generator-product-image-380x410.png"
                    alt="upload-placeholder"
                  />
                </div>
                <p className="pointer-none text-gray-500">
                  <span className="text-sm">Drag and drop</span> files here <br /> or{' '}
                  <span href="#" id="" className="text-blue-600 hover:underline">
                    select a file
                  </span>{' '}
                  from your computer
                </p>
              </div>
              <input
                type="file"
                accept="."
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={qrCodeData.length === 0}
        >
          Open QR Codes Modal
        </button>

        {isModalOpen && (
          <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ width: '600px', height: 'auto' }}>
              <h2 className="text-lg text-center font-bold">QR Codes</h2>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={closeModal}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Close
                </button>
                <button
                  onClick={downloadQRCodesAsPDF}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Download as PDF'}
                </button>
              </div>

              <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
                {qrCodeData.map((data, index) => (
                  <div
                    key={index}
                    ref={(el) => (qrCardRefs.current[index] = el)}
                    className="bg-white border border-black-200 mt-5"
                    style={{ width: '430px', height: '590px'}}
                  >
                    <div className="flex flex-col items-center mt-4">
                      <QRCodeCanvas value={data.url} size={320} className="qr-code m-1" />
                      <span className="text-center tracking-super-wide font-semibold text-gray-800 ml-4 " style={{ fontSize: '45px' ,marginBottom:'18px',marginTop:'-10px'}}>
                        {data.code}
                      </span>
                      <div
                        className="text-center rounded-lg pb-0 mb-0"
                        style={{
                          border: '3px solid black',
                          width: '370px',
                          height: '120px',
                          // fontSize: '20px',
                        }}
                      >
                        <p>
                          <p style={{ fontSize: '24px', marginBottom:'38px', marginTop:'-10px' }} > 
                          Scan the QR code or visit
                          <br />
                          <a href={data.url} className="text-black-600 font-extrabold" style={{ fontSize: '22px' }}>
                            {/* {data.url} */}
                            bit.ly/oasiscb24 &nbsp;
                          </a>
                            and enter the  <br /> coupon code to avail cashback
                          </p>
                        </p>
                      </div>

                      <div className="flex items-center justify-center" style={{marginTop:'-10px'}}>
                        <span  style={{marginTop:'20px', marginRight:'5px'}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1em" viewBox="0 0 24 24">
                            <path fill="green" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.285-1.677a11.87 11.87 0 0 0 5.71 1.45h.006c6.555 0 11.89-5.335 11.893-11.891a11.823 11.823 0 0 0-3.475-8.378" />
                          </svg>
                        </span>
                        <p style={{ fontSize: '18px' }}>WhatsApp Helpline: 8766070705</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleQRCodesWithPDF;
