import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
	selector: 'app-user-page',
	standalone: true,
	imports: [CommonModule, UserInfoComponent, OrderHistoryComponent],
	templateUrl: './user-page.component.html',
	styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
	mode: string = `profile`;
}
