import { Pipe, PipeTransform } from '@angular/core';

export interface IFileType {
  extension: string;
  type: string;
}

export const FileTypeArray: IFileType[] = [
  { extension: 'html', type: 'Html File' },
  { extension: 'xhtml', type: 'Html File' },
  { extension: 'css', type: 'Stylesheet' },
  { extension: 'xml', type: 'Xml File' },
  { extension: 'gif', type: 'Gif' },
  { extension: 'jpeg', type: 'Image' },
  { extension: 'jpg', type: 'Image' },
  { extension: 'js', type: 'Javascript File' },
  { extension: 'txt', type: 'Text File' },
  { extension: 'png', type: 'Image' },
  { extension: 'ico', type: 'Icon' },
  { extension: 'bmp', type: 'Image' },
  { extension: 'svg', type: 'Image' },
  { extension: 'jar', type: 'Archive' },
  { extension: 'doc', type: 'Document' },
  { extension: 'pdf', type: 'PDF Document' },
  { extension: 'xls', type: 'Excel Document' },
  { extension: 'ppt', type: 'Powerpoint' },
  { extension: 'rar', type: 'Compressed' },
  { extension: 'zip', type: 'Compressed' },
  { extension: 'gzip', type: 'Compressed' },
  { extension: 'tar', type: 'Compressed' },
  { extension: 'mp3', type: 'Audio' },
  { extension: 'wav', type: 'Audio' },
  { extension: 'ra', type: 'Audio' },
  { extension: 'mov', type: 'Video' },
  { extension: 'wmv', type: 'Video' },
  { extension: 'mp4', type: 'Video' },
  { extension: 'm4v', type: 'Video' },
  { extension: 'avi', type: 'Video' },
  { extension: 'mpeg', type: 'Video' },
  { extension: 'exe', type: 'Executable File' },
];
/**
 * Custom Pipe to get type of file from extension
 */
@Pipe({ name: 'fileType' })

export class FileTypPipe implements PipeTransform {

    transform(fileName: string) {

        const fileExtension = fileName.substring( fileName.lastIndexOf('.') + 1, fileName.length ) || fileName;

        const fileTypeName = FileTypeArray.find((file) => file.extension === fileExtension.toLowerCase());

        if ( fileTypeName ) {
            return fileTypeName.type;
        } else {
            return 'Other';
            // return 'Invalid File Format';
        }

    }

}
