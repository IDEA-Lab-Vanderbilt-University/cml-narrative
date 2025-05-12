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
				.addImage('/img/logos/SPOT-black.png', 'PNG', x + 0, y + 10, 80, 17.5)
				.addImage(img, 'PNG', x, y + 25, 50, 50)
				.setFontSize(18)
				.text(student.first_name + ' ' + student.last_name, x + 50, y + 35)
				.setFontSize(12)
				.text(
					[
						'You have been selected to become a new agent with SPOT, the Solving Problems of Tomorrow Agency!',
						'Use this credential to log into the SPOT Mainframe!'
					],
					x + 50,
					y + 45,
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
