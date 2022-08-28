// import * as FilePond from 'filepond';
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
// import FilePondPluginImageResize from 'filepond-plugin-image-resize'
// import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
// import FilePondPluginImageEdit from 'filepond-plugin-image-edit'

/*
npm i filepond-plugin-file-validate-type --save
npm i filepond-plugin-image-exif-orientation --save
npm i filepond-plugin-image-preview --save
npm i filepond-plugin-image-crop --save
npm i filepond-plugin-image-resize --save
npm i filepond-plugin-image-transform --save
npm i filepond-plugin-image-edit --save

npm uninstall filepond-plugin-file-validate-type filepond-plugin-image-exif-orientation filepond-plugin-image-preview filepond-plugin-image-crop filepond-plugin-image-resize filepond-plugin-image-transform filepond-plugin-image-edit --save --verbose
*/



// We register the plugins required to do 
// image previews, cropping, resizing, etc.
// FilePond.registerPlugin(
//     FilePondPluginFileValidateType,
//     FilePondPluginImageExifOrientation,
//     FilePondPluginImagePreview,
//     FilePondPluginImageCrop,
//     FilePondPluginImageResize,
//     FilePondPluginImageTransform,
//     FilePondPluginImageEdit
//     );



// const filepondx = (selector)=>{
//     FilePond.create(document.querySelector(selector),
//     {
//         labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
//         imagePreviewHeight: 170,
//         imageCropAspectRatio: '1:1',
//         imageResizeTargetWidth: 200,
//         imageResizeTargetHeight: 200,
//         stylePanelLayout: 'compact circle',
//         styleLoadIndicatorPosition: 'center bottom',
//         styleProgressIndicatorPosition: 'right bottom',
//         styleButtonRemoveItemPosition: 'left bottom',
//         styleButtonProcessItemPosition: 'right bottom',
//     }
//     );
// }

// export { filepondx }