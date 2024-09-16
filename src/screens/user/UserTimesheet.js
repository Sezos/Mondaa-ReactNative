/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import {
  Button,
  DataTable,
  IconButton,
  Modal,
  Portal,
} from "react-native-paper";
import services from "../../services/service";
import { Calendar } from "react-native-calendars";
import { COLOR_PALETTE } from "../../utils/Constants";
import { ProviderContext } from "../../provider/Provider";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
// import pdf from "pdfjs";
import RNFS from "react-native-fs";
import * as MailComposer from "expo-mail-composer";
import { grayscale, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function ManagerTimesheet({ navigation }) {
  //date datas
  const provider = useContext(ProviderContext);

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  //Boolean to show if calendar is shown

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  //Marked date on Calendar
  const [fromMarkedDate, setFromMarkedDate] = useState({});
  const [toMarkedDate, setToMarkedDate] = useState({});

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    _handleChangeDate(new Date().toISOString().split("T")[0], "");
    _fetchUserData();
  }, []);

  async function _fetchUserData() {
    const { data } = await services.getUserInfo();
    console.log(data);
    provider.setUserData(data);
  }

  useEffect(() => {
    if (from === null || to === null) return;
    _fetch();
  }, [from, to]);

  async function _fetch() {
    const { data } = await services.getWorkHoursTotalEmployee(
      from,
      to,
      provider.userData.id
    );
    setDatas(data);
  }

  const _download = async () => {
    const { data } = await services.downloadWorkHours(
      from,
      to,
      provider.userData.id
    );
    Linking.openURL(data.response);
  };

  const toggleCalendar = (calendar) => {
    if (calendar === "from") {
      setShowFrom(!showFrom);
    } else {
      setShowTo(!showTo);
    }
  };

  const generateInvoicePdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([500, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    page.drawText("Invoice", { x: 50, y: 750, size: 20, font });

    page.drawText(` Bill To\n Mondaa Group PTY LTD \n ABN: 29622396249`, {
      x: 50,
      y: 720,
      size: fontSize,
      font,
    });

    page.drawText(
      `Invoice#\tINV-001\nInvoice Date\t${
        new Date().toISOString().split("T")[0]
      }\nDue Date\t${new Date().toISOString().split("T")[0]}`,
      {
        x: 300,
        y: 720,
        size: fontSize,
        font,
      }
    );
    page.drawRectangle({
      x: 50,
      y: 630,
      width: 400,
      height: 25,
      color: grayscale(0.5),
      opacity: 0.5,
      borderOpacity: 0.75,
    });

    page.drawText("Item Name", { x: 50, y: 640, size: fontSize, font });
    page.drawText("Quantity", { x: 200, y: 640, size: fontSize, font });
    page.drawText("Rate", { x: 300, y: 640, size: fontSize, font });
    page.drawText("Amount", { x: 400, y: 640, size: fontSize, font });

    let yPosition = 610;
    let total = 0;

    console.log(datas);

    datas.forEach((item) => {
      const itemTotal = item.hours * item.rate;
      total += itemTotal;
      page.drawLine({
        start: { x: 50, y: yPosition - 5 },
        end: { x: 450, y: yPosition - 5 },
        thickness: 1,
        opacity: 0.2,
      });
      page.drawText(item.Project.ProjectLocation.name, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font,
      });

      page.drawText(`${item.hours} hours`, {
        x: 200,
        y: yPosition,
        size: fontSize,
        font,
      });

      page.drawText(`$${item.rate.toFixed(2)}`, {
        x: 300,
        y: yPosition,
        size: fontSize,
        font,
      });

      page.drawText(`$${itemTotal.toFixed(2)}`, {
        x: 400,
        y: yPosition,
        size: fontSize,
        font,
      });

      yPosition -= 20;
    });

    page.drawText("Total:", { x: 300, y: yPosition, size: fontSize, font });
    page.drawText(`$${total.toFixed(2)}`, {
      x: 400,
      y: yPosition,
      size: fontSize,
      font,
    });

    yPosition -= 40;
    page.drawText(`Worker ID: ${provider.userData.id ?? "-"}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font,
    });

    yPosition -= 20;
    page.drawText(`ABN Number: ${provider.userData.accountBSB ?? "-"}`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font,
    });

    yPosition -= 20;
    page.drawText(
      `Bank Account Name: ${provider.userData.accountName ?? "-"}`,
      {
        x: 50,
        y: yPosition,
        size: fontSize,
        font,
      }
    );

    yPosition -= 20;
    page.drawText(
      `Bank Account Number: ${provider.userData.accountNumber ?? "-"}`,
      {
        x: 50,
        y: yPosition,
        size: fontSize,
        font,
      }
    );

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
    const pdfPath = `${RNFS.DocumentDirectoryPath}/invoice.pdf`;

    await RNFS.writeFile(pdfPath, pdfBase64, "base64");
    return pdfPath;
  };

  const _generatePDF = async () => {
    const pdfPath = await generateInvoicePdf();

    const to = ["invoice@mondaa.com.au"];

    await MailComposer.composeAsync({
      subject: `Invoice of ${provider.userData.name} /${
        new Date().toISOString().split("T")[0]
      }/`,
      recipients: to,

      body: "Please find the attached invoice.",
      attachments: [pdfPath],
    });
  };

  const _handleChangeDate = (dateString, which) => {
    let markedObj = {};

    markedObj[dateString] = { selected: true, selectedColor: "#4355FA" };

    if (which === "from") {
      setFromMarkedDate(markedObj);
    } else if (which === "to") {
      setToMarkedDate(markedObj);
    } else {
      setFromMarkedDate(markedObj);
      setToMarkedDate(markedObj);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 60,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              icon="arrow-left"
              iconColor="#04092199"
              size={18}
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
            <Text>Timesheet</Text>
          </View>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <IconButton icon="file-pdf-box" onPress={_generatePDF} />
            <IconButton icon="download" onPress={_download} />
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Button
            style={{
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              borderColor: "#D4D4D4",
              height: 50,
              width: 150,
              borderWidth: 1,
              justifyContent: "center",
              color: "black",
              borderRightWidth: 0,
            }}
            onPress={() => {
              toggleCalendar("from");
            }}
          >
            <Text style={{ color: "#545458", paddingHorizontal: 20 }}>
              {from === null ? "Start Date" : from}
            </Text>
          </Button>
          <Button
            style={{
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              borderColor: "#D4D4D4",
              height: 50,
              width: 150,
              borderWidth: 1,
              justifyContent: "center",
              color: "black",
              borderLeftWidth: 0,
            }}
            onPress={() => {
              toggleCalendar("to");
            }}
          >
            <Text style={{ color: "#545458" }}>
              {to === null ? "End Date" : to}
            </Text>
          </Button>
        </View>
        <DataTable style={{}}>
          <DataTable.Header>
            <DataTable.Title>Location</DataTable.Title>
            <DataTable.Title numeric>Date</DataTable.Title>
            <DataTable.Title numeric>Hours</DataTable.Title>
            <DataTable.Title numeric>Salary</DataTable.Title>
          </DataTable.Header>

          <GestureHandlerRootView>
            <ScrollView style={{ height: "84%" }}>
              {datas?.map((data, idx) => {
                return (
                  <DataTable.Row key={idx}>
                    <DataTable.Cell>
                      {data.Project.ProjectLocation.name}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      {data.Project.date.split("T")[0].split("-")[1] +
                        "-" +
                        data.Project.date.split("T")[0].split("-")[2]}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>{data.hours}</DataTable.Cell>
                    <DataTable.Cell numeric>${data.salary}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </GestureHandlerRootView>
        </DataTable>
      </View>
      <Portal>
        <Modal
          visible={showFrom}
          onDismiss={() => {
            toggleCalendar("from");
          }}
          contentContainerStyle={styles.ModalStyle}
        >
          <Calendar
            markedDates={fromMarkedDate}
            style={{
              height: 300,
              marginHorizontal: 10,
              borderRadius: 20,
            }}
            onDayPress={(day) => {
              _handleChangeDate(day.dateString, "from");
            }}
            monthFormat="MMM yyyy"
            hideExtraDays={true}
            firstDay={0}
            enableSwipeMonths={false}
          />
          <Button
            mode="contained"
            style={{
              marginVertical: 20,
              width: "90%",
              alignSelf: "center",
              borderRadius: 10,
            }}
            buttonColor={COLOR_PALETTE.primaryColor}
            textColor="#fff"
            onPress={() => {
              setFrom(Object.keys(fromMarkedDate)[0]);
              toggleCalendar("from");
            }}
          >
            Select
          </Button>
        </Modal>
        <Modal
          visible={showTo}
          onDismiss={() => {
            toggleCalendar("to");
          }}
          contentContainerStyle={styles.ModalStyle}
        >
          <Calendar
            markedDates={toMarkedDate}
            style={{
              height: 300,
              marginHorizontal: 10,
              borderRadius: 20,
            }}
            onDayPress={(day) => {
              _handleChangeDate(day.dateString, "to");
            }}
            monthFormat="MMM yyyy"
            hideExtraDays={true}
            firstDay={0}
            enableSwipeMonths={false}
          />
          <Button
            mode="contained"
            style={{
              marginVertical: 20,
              width: "90%",
              alignSelf: "center",
              borderRadius: 10,
            }}
            buttonColor={COLOR_PALETTE.primaryColor}
            textColor="#fff"
            onPress={() => {
              setTo(Object.keys(toMarkedDate)[0]);
              toggleCalendar("to");
            }}
          >
            Select
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  ModalStyle: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    display: "flex",
    alignSelf: "center",
  },
  datatable_button: {
    flex: 1,
    marginTop: 7,
    flexDirection: "row",
    width: "auto",
    alignItems: "center",
    justifyContent: "flex-end",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    width: "95%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
});
