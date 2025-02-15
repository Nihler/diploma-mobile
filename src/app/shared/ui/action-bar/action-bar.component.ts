import { Component, Input, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { isAndroid } from "@nativescript/core";
import { Page } from "@nativescript/core/ui/page";

import { UIService } from "../../ui.service"

declare var android: any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id
})

export class ActionBarComponent implements OnInit {

  @Input() title: string;
  @Input() showBackButton = true;
  @Input() hasMenu = true;
  
  
  constructor(private page: Page, private router: RouterExtensions, private uiService: UIService) { }

  ngOnInit(): void {
  }

  get android(){
    return isAndroid;
  }

  get canGoBack() {
    return this.router.canGoBack()  && this.showBackButton;
  }

  onGoBack(){
    this.router.backToPreviousPage();
  }

  onLoadedActionBar(): void {
    if (isAndroid) {
        const androidToolbar = this.page.actionBar.nativeView;
        const backButton = androidToolbar.getNavigationIcon();
        if (backButton) {
            // backButton.setColorFilter(
            //     android.graphics.Color.parseColor("#171717")
            //     //(<any>android.graphics).PorterDuff.Mode.SRC_AT0P
            // );
        }
    }
}

onToggleMenu(){
  this.uiService.toggleDrawer();
}

}
