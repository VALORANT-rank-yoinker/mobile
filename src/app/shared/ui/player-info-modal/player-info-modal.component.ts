import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { Player } from '../../interface/heartbeat.interface';

@Component({
  selector: 'app-player-info-modal',
  templateUrl: './player-info-modal.component.html',
  styleUrls: ['./player-info-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SwiperModule],
})
export class PlayerInfoModalComponent implements OnInit {
  player: Player;

  constructor() {}

  ngOnInit() {}
}
