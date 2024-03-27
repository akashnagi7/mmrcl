import { React, useState } from "react";
import Button from "@mui/material/Button";
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import Mappart from "./MyComponents/Layout/Mappart";
import Legend from "./MyComponents/Legend/Legend";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PrintGenerator = (report) => {
  const reportTemplateRef = useRef(null);
  const reportRef = useRef(null);

  const [titlename, setTitlename] = useState("GRAM GIS");
  const handletitleChange = (event) => {
    const value = event.target.value;
    setTitlename(value);
  };
  const [scalename, setScalename] = useState(false);
  const [legendname, setLegendname] = useState(false);
  const [northarrowname, setNortharrowname] = useState(false);
  const [fileformat, SetFileformat] = useState("PDF");
  const handlefileformat = (event) => {
    SetFileformat(event.target.value);
  };
  const mapElementA = report.report;
  // const [checkboxData, setCheckboxData] = useState(props.myname || []);

  const pngmethod = (mapElement) => {
    toPng(mapElement)
      .then((dataUrl) => {
        downloadpdf(mapElement, dataUrl);
      })
      .catch((error) => {
        console.error("Error exporting map to PDF:", error);
      });
  };

  const html2canvasoption = (mapElement) => {
    html2canvas(mapElement, { useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        if (legendname) {
          html2canvaslegend(mapElement, imgData);
        } else {
          downloadpdf(mapElement, imgData, imgData);
        }
      })
      .catch((error) => {
        console.error("Error exporting map to PDF:", error);
      });
  };

  const html2canvaslegend = (mapElement, mapimgData) => {
    html2canvas(reportRef.current, { useCORS: true })
      .then((canvas) => {
        const limgData = canvas.toDataURL("image/jpeg");
        downloadpdf(mapElement, mapimgData, limgData);
      })
      .catch((error) => {
        console.error("Error exporting map to PDF:", error);
      });
  };

  const downloadpdf = (mapElement, imgfile, limgData) => {
    const pdf = new jsPDF("l", "px", "letter");
    const imgWidth = 300; // Adjust the image width as needed
    const imgHeight =
      (imgWidth * mapElement.offsetHeight) / mapElement.offsetWidth;
    const x = 10; // Adjust the X coordinate of the image as needed
    const y = 20; // Adjust the Y coordinate of the image as needed

    pdf.setFontSize(14); // Adjust the font size of the title as needed
    pdf.text(titlename, x, y - 2); // Adjust the Y coordinate of the title as needed

    // console.log(imgdata);
    if (imgfile !== "") {
      pdf.addImage(imgfile, "PNG", x, y, imgWidth, imgHeight);
    }

    if (scalename === true) {
      pdf.text("Scale details", x + 300, y - 2); // Adjust the Y coordinate of the title as needed
    }
    if (legendname === true) {
      pdf.text("legend details", x + 480, y - 2); // Adjust the Y coordinate of the title as needed
      pdf.addImage(limgData, "PNG", x + 480, y);
    }
    if (northarrowname === true) {
      pdf.text("North Arrow", x + 320, y + 50); // Adjust the Y coordinate of the title as needed
    }

    pdf.save("GRAM_GIS." + fileformat);
  };

  function exportMapToPDF() {
    const mapElement = report.report;
    // const mapElement = reportRef.current;
    // console.log(mapElement);
    // const mapElement = mapRef.current;
    // const mapElement = reportTemplateRef.current

    // -------------------------------------------------1
    // pngmethod(mapElement);
    // -------------------------------------------------1

    // -------------------------------------------------2
    html2canvasoption(mapElement);
    // -------------------------------------------------2

    // -------------------------------------------------2

    // -------------------------------------------------2
  }

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <Text>Section #1</Text>
          <Image
            // style={styles.image}
            src="./G_Ram_Logo.svg"
            cache={false}
          />
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  const [show3, setShow3] = useState(false);
  const handleShow3 = () => {
    setShow3(true);
  };

  const handleClose3 = () => {
    setShow3(false);
  };

  return (
    <>
      <div style={{ margin: "15px" }}>
        {" "}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title of Map"
            onChange={handletitleChange}
            value={titlename}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Scale"
            onChange={() => {
              setScalename(!scalename);
            }}
            checked={scalename}
          />
          <Form.Check
            type="checkbox"
            label="Legend"
            onChange={() => {
              setLegendname(!legendname);
            }}
            checked={legendname}
          />
          {legendname ? (
            <div className="col-md-12" ref={reportRef}>
              <div className="row">
                <div className="col-md-3">
                  <Legend />
                </div>
              </div>
            </div>
          ) : null}
          <Form.Check
            type="checkbox"
            label="North Arrow"
            onChange={() => {
              setNortharrowname(!northarrowname);
            }}
            checked={northarrowname}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>File Format</Form.Label>
          <Form.Select onChange={handlefileformat} value={fileformat}>
            <option value="PDF">PDF</option>
            <option value="PNG">PNG</option>
          </Form.Select>
        </Form.Group>
        <Button variant="contained" onClick={exportMapToPDF}>
          Export
        </Button>
        {/* <PDFDownloadLink document={<MyDocument />} fileName="G-RAM_GIS.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <Button style={{ background: "#546180", width: "190px" }}>
                Export
              </Button>
            )
          }
        </PDFDownloadLink> */}
      </div>

      <Modal show={show3} onHide={handleClose3} backdrop="static" centered>
        <Modal.Header
          style={{ color: "white", background: "#294A69", padding: "10px" }}
          closeButton
        >
          <Modal.Title style={{ fontSize: "14px" }}>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body> </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={exportMapToPDF}>
            Export
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrintGenerator;
