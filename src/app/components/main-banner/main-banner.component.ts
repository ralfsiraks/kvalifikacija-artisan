import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-main-banner',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './main-banner.component.html',
	styleUrl: './main-banner.component.scss',
})
export class MainBannerComponent implements AfterViewInit {
	@ViewChild('myIframe') myIframe: ElementRef;

	ngAfterViewInit(): void {
		const iframe = this.myIframe.nativeElement;
		iframe.onload = () => {
			const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
			const elementWithinIframe = iframeDocument.querySelector('.spline-watermark');
			console.log(elementWithinIframe); // This will log the element you want
		};
	}
}
