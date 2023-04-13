/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractJson from './assets/MyContract.json';
import * as artistJson from './assets/artist.json';
import * as dotenv from "dotenv";
import {ItemDTO } from './dtos/getItemList.dto';
dotenv.config();

const MP_CONTRACT_ADDRESS = "0x23D30d4C0bd879C94008D6F0d159Ca72835fCF00";
const ARTIST_CONTRACT_ADDRESS = "0x1F0544BAF1C38A5b29F4D49F0aF5d16ac27dF67b";

@Injectable()
export class AppService {
  artistContract: ethers.Contract;
  mpContract: ethers.Contract;
  provider: ethers.providers.Provider;
  constructor(){
    // this.provider = new ethers.providers.InfuraProvider('sepolia', process.env.INFURA_API_KEY);
    this.provider = ethers.getDefaultProvider('sepolia');
    this.mpContract = new ethers.Contract(
    MP_CONTRACT_ADDRESS,
    contractJson.abi,
    this.provider,
    );
    console.log('construct success!')
    this.artistContract = new ethers.Contract(
      ARTIST_CONTRACT_ADDRESS,
      artistJson.abi,
      this.provider,
    )
  };



  async artistList(): Promise<any> {

    const result = await this.artistContract.getAllArtists();

    // Process the raw result into a usable format
    const formattedResult = result.map(entry => ({
      uint1: entry[0],
      uint2: entry[1],
      address: entry[2],
      string: entry[3]
    }));

   return formattedResult;
  }




























  async itemsList(): Promise<ItemDTO[]> {

    //retrieve the list of all items in the marketplace

    const count = await this.mpContract.itemCount();
    const countNumber = count.toNumber();
    const itemsArray = [];
    
    console.log(countNumber)
    for(let i = 1; i <= countNumber; i++ ){
        const [nftContract, tokenId, amount, price, seller,name, sold] = await this.mpContract.items(i);
        console.log("The items should follow");
        itemsArray.push(
          {countNumber: i,},
          {
          address: nftContract,
          tokenId: tokenId,
          amount: amount,
          price: price, 
          seller: seller,
          name: name,
          sold: sold,
        })
        console.log("End of loop")
    }

    return itemsArray;
  }
  
}
