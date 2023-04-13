/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ItemDTO } from './dtos/getItemList.dto';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('itemList')
  async getItemList(): Promise<ItemDTO[]>{
    return this.appService.itemsList();
  }

  @Get('getArtist')
  async getArtistList(): Promise<any>{
    return this.appService.artistList();
  }
}
