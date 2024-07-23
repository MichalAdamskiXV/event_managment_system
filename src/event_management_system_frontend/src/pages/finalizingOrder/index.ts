import jsPDF from "jspdf";
import { TicketData, UserData } from "./FinalOrder";

export const generatePdf = (ticketData: TicketData, userData: UserData) => {
    if (ticketData && userData) {
        const parsedTicketData = JSON.parse(ticketData.metadata);
        const doc = new jsPDF();

        console.log(parsedTicketData);

        doc.setFillColor(34, 34, 34);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

        const rectangleHeightMm = 50 * 0.26458;
        const pageWidthMm = doc.internal.pageSize.getWidth();

        doc.setFillColor(0, 198, 207);
        doc.rect(0, 0, pageWidthMm, rectangleHeightMm, 'F');

        doc.setTextColor(0, 0, 0);
        const title = `${parsedTicketData.eventName}`;
        const titleWidth = doc.getTextWidth(title);
        const center = (pageWidthMm - titleWidth) / 2;
        doc.text(`${title.toUpperCase()}`, center, rectangleHeightMm - 5);

        doc.setTextColor(255, 255, 255);
        doc.text(`${userData.userName} ${userData.userLastname}`, 10, rectangleHeightMm + 10);
        doc.text(`Owner ID: ${ticketData.owner.toString()}`, 10, rectangleHeightMm + 20);
        doc.text(`Ticket ID: ${ticketData.id}`, 10, rectangleHeightMm + 30);
        doc.text(`Localization: ${parsedTicketData.localization}, From: ${parsedTicketData.hourFrom.slice(0, 5)} - To: ${parsedTicketData.hourTo.slice(0, 5)}`, 10, rectangleHeightMm + 40);

        doc.save(`TICKET-${ticketData.id}.pdf`);
    }
}