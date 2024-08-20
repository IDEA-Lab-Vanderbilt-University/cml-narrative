import type { Student } from '$lib/types/teacher-view/Student';

import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export const generateQRCodes = async (students: Student[]) => {
	console.log('Begin Generating QR Codes', students);

	let documentFactory: any = await generatePDFDocument(students);
	documentFactory.save('agent-ids.pdf');
};

const generatePDFDocument = async (students: Student[]) => {
	const doc = new jsPDF();

	return await new Promise(async (resolve, reject) => {
		let x = 10;
		let y = 10;

		let index = 0;

		students.forEach(async (student) => {
			let img = await generateQRCode(student);

			if (index % 4 == 0 && index != 0) {
				doc.addPage();
				y = 10;
			}

			doc
				.setFontSize(20)
				.text('WELCOME TO SPOT, AGENT!', x + 50, y + 10, {
					align: 'center'
				})
				.addImage(img, 'PNG', x, y + 10, 50, 50)
				.setFontSize(18)
				.text(student.firstName + ' ' + student.lastName, x + 50, y + 20)
				.setFontSize(12)
				.text(
					[
						'You have been seelected to become a new agent with SPOT, the Solving Problems of Tomorrow Agency!',
						'Use this credential to log into the SPOT Mainframe!'
					],
					x + 50,
					y + 30,
					{
						maxWidth: 140
					}
				);

			y += 60;
			index += 1;
		});

		resolve(doc);
	});
};

const generateQRCode = async (student: Student) => {
	let dataString: string = await QRCode.toDataURL(JSON.stringify(student));
	return dataString;
};
