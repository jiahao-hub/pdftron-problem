import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit{

  @ViewChild('viewer') viewer: ElementRef;
  wvInstance: any;

  ngAfterViewInit(): void {

    WebViewer({
      path: '../../lib',
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;
      const { docViewer, annotManager, CoreControls, Annotations } = instance;
      // now you can access APIs through this.webviewer.getInstance()
      instance.openElements(['notesPanel']);
      // see https://www.pdftron.com/documentation/web/guides/ui/apis for the full list of APIs

      // or listen to events from the viewer element
      this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
        const [ pageNumber ] = e.detail;
        console.log(`Current page is ${pageNumber}`);
      });

      // or from the docViewer instance
      instance.docViewer.on('annotationsLoaded', async () => {
        console.log('annotations loaded');
      });

      instance.setHeaderItems((header) => {
        header.push({
          type: 'actionButton',
          img: '../../../../assets/icon/save.png',
          onClick: async () => {
            console.log('setHeaderItems myDownload');
            const doc = docViewer.getDocument();
            const xfdfString = await annotManager.exportAnnotations();
            const data = await doc.getFileData({
              // saves the document with annotations in it
              xfdfString,
            });
            console.log(data)
            // const arr = new Uint8Array(data);
            // const blob = new Blob([arr], { type: 'application/pdf' });
            // const url = URL.createObjectURL(blob);
          },
        });
      });
    })
  }

  ngOnInit() {
  }

}
