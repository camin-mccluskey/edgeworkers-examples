import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import ESCrypto from 'crypto-es';

export function onClientResponse(request, response) {
  // construct id
  const random = CryptJsWordArrayToUint8Array(ESCrypto.lib.WordArray.random(16));
  const id = uuid({ random });
  console.log(id);
  
  // construct jwt with claims
  const token = jwt.sign({ id }, 'secret');
  console.log(token);
}

// https://github.com/brix/crypto-js/issues/274
/* Converts a cryptjs WordArray to native Uint8Array */                                                                                  
function CryptJsWordArrayToUint8Array(wordArray) {                                                                                       
  const l = wordArray.sigBytes;                                                                                                        
  const words = wordArray.words;                                                                                                       
  const result = new Uint8Array(l);                                                                                                    
  var i=0 /*dst*/, j=0 /*src*/;
  while(true) {
      // here i is a multiple of 4
      if (i==l)
          break;
      var w = words[j++];
      result[i++] = (w & 0xff000000) >>> 24;
      if (i==l)
          break;
      result[i++] = (w & 0x00ff0000) >>> 16;                                                                                            
      if (i==l)                                                                                                                        
          break;                                                                                                                       
      result[i++] = (w & 0x0000ff00) >>> 8;
      if (i==l)
          break;
      result[i++] = (w & 0x000000ff);                                                                                                  
  }
  return result;
}


onClientResponse();