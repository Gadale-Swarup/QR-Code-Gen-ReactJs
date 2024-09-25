import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";

const QRCodeGeneratorStyled = () => {
  const [data, setData] = useState("");
  const [description, setDescription] = useState("");
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [qrType, setQrType] = useState("URL"); // To manage selected tab
  const qrCardRef = useRef();

  const handleGenerateQRCode = () => {
    if (data.trim()) {
      setQrCodeVisible(true);
    } else {
      alert("Please enter some data to generate a QR Code.");
    }
  };

  const handleInputChange = (e) => {
    setData(e.target.value);
    setQrCodeVisible(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const downloadQRCodeWithDetails = () => {
    html2canvas(qrCardRef.current).then((canvas) => {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code-with-details.png";
      link.click();
    });
  };

  const handleTabChange = (type) => {
    setQrType(type);
    setQrCodeVisible(false); // Reset QR on tab change
  };

  return (
    <div className="bg-white-500 h-900px">

    <div className="flex flex-col items-center justify-center p-4">
      {/* Main container */}
      <div className="bg-white shadow-lg rounded-lg  border-2 p-5 w-full max-w-5xl mt-5">
        {/* Tab Navigation */}
        

        {/* Form Input */}
        <div className="flex flex-row justify-between">

          <div className="flex-1 mr-4">
          <div className="flex space-x-2 mb-4">
          {["URL", "Text", "Wi-Fi", "Email", "WhatsApp",  "PDF"].map((type) => (
            <button
              key={type}
              onClick={() => handleTabChange(type)}
              className={`px-4 py-2 rounded-md ${
                qrType === type ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              } transition duration-300`}
            >
              {type}
            </button>
          ))}
        </div>
            <h1 className="text-2xl font-semibold mb-4">Website URL</h1>
            <input
              type="text"
              placeholder="E.g. https://www.myweb.com/"
              value={data}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={handleDescriptionChange}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500"
          />


            <button
              onClick={handleGenerateQRCode}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 w-full"
            >
              Generate QR Code
            </button>
          </div>
          

          {/* QR Code Preview */}
          <div className="flex flex-col items-center w-1/2 rounded-lg shadow-md border-2"><span className="font-bold text-xl ">QR Code</span>
          {qrCodeVisible && (
            <>
              <div className="mt-0 flex  ">
                {/* Card containing QR code and description */}
                <div
                  className="bg-gray-50 shadow-md rounded-lg p-6 border border-gray-200"
                  ref={qrCardRef}
                  style={{ width: "400px", height: "570px" }} // Increased height to prevent clipping
                >
                  <div className="flex flex-col items-center">
                    {/* QR Code */}
                    <QRCodeCanvas value={data} size={280} className="qr-code" />

                    {/* Add description text */}
                    <p className="text-center text-gray-800 text-xl mt-4">
                      {description}
                    </p>

                    {/* Additional text below QR code */}
                    <div
                      className="text-center mt-4 rounded-lg p-2 border-2 border-black"
                      style={{
                        width: "370px",
                        height: "140px",
                        fontSize: "20px",
                      }}
                    >
                      <p>
                        Scan the QR code or visit
                        <br />
                        <a
                          href={`https://bit.ly/oasiscb/${description}`}
                          className="text-blue-600 font-bold"
                        >
                          bit.ly/oasiscb/{description}
                        </a>
                        <br />
                        and enter the coupon code to avail cashback
                      </p>
                    </div>

                    {/* WhatsApp Helpline */}
                    <div className="flex items-center justify-center mt-0">
                      <span className="mt-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.4em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="green"
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="text-lg mt-2">
                          WhatsApp Helpline: 8999877656
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button to download QR Code with details */}
              <button
                onClick={downloadQRCodeWithDetails}
                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition duration-300 w-full"
              >
                Download QR Code with Details
              </button>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default QRCodeGeneratorStyled;
