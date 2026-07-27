import type { Student } from '$lib/types/teacher-view/Student';

import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export const generateQRCodes = async (students: Student[]) => {
	console.log('Begin Generating QR Codes', students);

	let documentFactory: any = await generatePDFDocument(students);
	documentFactory.save('agent-ids.pdf');
};

export const generateQRCodeImages = async (students: Student[]) => {
	console.log('Begin Generating QR Images', students);

	const canvas = await generateQRImageSheet(students);
	const link = document.createElement('a');
	link.href = canvas.toDataURL('image/png');
	link.download = 'agent-ids.png';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const generatePDFDocument = async (students: Student[]) => {
	const doc = new jsPDF();

	return await new Promise(async (resolve, reject) => {
		let x = 10;
		let y = 0;

		let index = 0;

		students.forEach(async (student) => {
			let img = await generateQRCode(student);

			if (index % 4 == 0 && index != 0) {
				doc.addPage();
				y = 10;
			}

			doc
				.setFontSize(20)
				.addImage('/img/logos/SPOT-black.png', 'PNG', x, y + 10, 80 * 0.9, 17.5 * 0.9)
				.addImage(img, 'PNG', x, y + 25, 50, 50, 'qr' + index, 'NONE')
				.setFontSize(18)
				.text(
					'Welcome to SPOT, Agent!',
					x + 130,
					y + 20,
					{
						maxWidth: 140,
						align: 'center'
					}
				)
				.text(student.first_name + ' ' + student.last_name, x + 130, y + 35, {
					maxWidth: 140,
					align: 'center'
				})
				.setFontSize(11)
				.text(
					[
						'You have been selected to become a new agent with',
						'the Solving Problems Of Tomorrow Agency!',
						'Use this credential to log into the SPOT Mainframe!'
					],
					x + 130,
					y + 45,
					{
						maxWidth: 140,
						align: 'center'
					}
				);

			y += 65;
			index += 1;
		});

		resolve(doc);
	});
};

const generateQRImageSheet = async (students: Student[]) => {
	const cardWidth = 320;
	const cardHeight = 260;
	const margin = 24;
	const columns = students.length <= 1 ? 1 : 2;
	const rows = Math.max(1, Math.ceil(students.length / columns));
	const canvasWidth = (cardWidth * columns) + (margin * (columns + 1));
	const canvasHeight = (cardHeight * rows) + (margin * (rows + 1));

	const canvas = document.createElement('canvas');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Unable to create image canvas.');
	}

	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.textAlign = 'center';
	ctx.textBaseline = 'top';

	const logo = await loadImage('/img/logos/SPOT-black.png');

	for (let i = 0; i < students.length; i++) {
		const student = students[i];
		const img = await generateQRCode(student);
		const qrImage = await loadImage(img);

		const column = i % columns;
		const row = Math.floor(i / columns);
		const x = margin + column * (cardWidth + margin);
		const y = margin + row * (cardHeight + margin);

		ctx.fillStyle = '#f8fafc';
		ctx.fillRect(x, y, cardWidth, cardHeight);
		ctx.strokeStyle = '#cbd5e1';
		ctx.lineWidth = 3;
		ctx.strokeRect(x, y, cardWidth, cardHeight);

		ctx.drawImage(logo, x + 14, y + 12, 92, 20);
		ctx.drawImage(qrImage, x + 18, y + 46, 112, 112);

		ctx.fillStyle = '#111827';
		ctx.font = 'bold 18px sans-serif';
		ctx.fillText('Welcome to SPOT, Agent!', x + 234, y + 38, 142);

		ctx.font = 'bold 17px sans-serif';
		ctx.fillText(`${student.first_name ?? ''} ${student.last_name ?? ''}`.trim(), x + 234, y + 68, 142);

		ctx.font = '13px sans-serif';
		wrapText(
			ctx,
			[
				'You have been selected to become a new agent with',
				'the Solving Problems Of Tomorrow Agency!',
				'Use this credential to log into the SPOT Mainframe!'
			],
			x + 234,
			y + 95,
			142,
			17
		);
	}

	return canvas;
};

const loadImage = (src: string) => {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
};

const wrapText = (
	ctx: CanvasRenderingContext2D,
	lines: string[],
	x: number,
	y: number,
	maxWidth: number,
	lineHeight: number
) => {
	let offsetY = 0;
	for (const line of lines) {
		const words = line.split(' ');
		let currentLine = '';
		for (const word of words) {
			const testLine = currentLine ? `${currentLine} ${word}` : word;
			if (ctx.measureText(testLine).width > maxWidth && currentLine) {
				ctx.fillText(currentLine, x, y + offsetY);
				offsetY += lineHeight;
				currentLine = word;
			} else {
				currentLine = testLine;
			}
		}
		if (currentLine) {
			ctx.fillText(currentLine, x, y + offsetY);
			offsetY += lineHeight;
		}
	}
};

const generateQRCode = async (student: Student) => {
	let student_lite = {
		id: student.id,
	};
	
	let dataString: string = await QRCode.toDataURL(JSON.stringify(student_lite));
	return dataString;
};
