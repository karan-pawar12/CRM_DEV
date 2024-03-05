import FileIcon from "../../resources/icons/FileIcon";
import SpreadSheetIcon from "../../resources/icons/SpreadSheetIcon";
import PDFIcon from "../../resources/icons/PDFIcon";
import PhotoIcon from "../../resources/icons/PhotoIcon";
import VideoIcon from "../../resources/icons/VideoIcon";
import DeleteOutlinedIcon from "../../resources/icons/DeleteOutlinedIcon";
import { Button } from "@nextui-org/react";

export default function FileCard({ name, size, onRemove }) {



    return <div className="border border-default-200 rounded-md py-1 px-2">
        <div className="flex gap-2 items-start">
            <ExtIcon filename={name} />
            <div className="flex flex-col gap-1">
                <div className="text-sm">{name}</div>
                <div className="text-default-500 text-xs">{getSize(size)}</div>
            </div>
            <Button radius="full" size="sm" onClick={onRemove} isIconOnly variant="light">
                <DeleteOutlinedIcon size={16} />
            </Button>
        </div>
    </div>
}
const units = ['bytes', 'KB', 'MB', 'GB'];

function getSize(x) {

    let l = 0, n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }

    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}


function ExtIcon({ filename }) {

    let ext = filename.substring(filename.lastIndexOf('.') + 1);

    if (['xls', 'xlsx', 'xlsb', 'XLS', 'XLSX', 'XLSB', 'csv', 'CSV'].includes(ext)) {
        return <span className="text-green-500"><SpreadSheetIcon size={16} /></span>
    } else if (['pdf', 'PDF'].includes(ext)) {
        return <span className="text-red-500"><PDFIcon size={16} /></span>
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'cif', 'JPG', 'JPEG', 'PNG', 'GIF', "CIF", 'WEBP'].includes(ext)) {
        return <PhotoIcon size={16} />
    } else if (['mp4', 'mpeg4', 'mpeg', 'avi', 'mkv', 'MP4', 'MPEG4', 'MPEG', 'AVI', 'MKV'].includes(ext)) {
        return <VideoIcon size={16} />
    } else {
        return <FileIcon size={16} />
    }


}