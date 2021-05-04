// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Component } from '@angular/core';
import { IVisualEmbedConfiguration, models } from 'powerbi-client';
import { HttpService } from 'src/app/services/httpservice.service';
import { ConfigResponse } from 'src/interfaces';
import { reportUrl } from '../../constants';

@Component({
  selector: 'visual-embed',
  templateUrl: './visual-embed.component.html',
})
export class VisualEmbedComponent {
  // Overall status message of embedding
  displayMessage = 'The visual is bootstrapped. Click Embed Visual button to set the access token.';

  // CSS Class to be passed to the wrapper
  visualClass = 'visual-container';

  // Pass the basic embed configurations to the wrapper to bootstrap the visual on first load
  // Values for properties like embedUrl and accessToken click of button
  visualConfig: IVisualEmbedConfiguration = {
    type: 'visual',
    visualName: '',
    tokenType: models.TokenType.Embed,
  };

  constructor(public httpService: HttpService) {}

  async embedVisual(): Promise<void> {
    let visualConfigResponse: ConfigResponse;

    // Get the embed config from the service and set the tileConfigResponse
    try {
      visualConfigResponse = await this.httpService.getEmbedConfig(reportUrl).toPromise();
    } catch (error) {
      console.error(`Failed to fetch config for visual. Status: ${error.statusText} Status Code: ${error.status}`);
      return;
    }

    // Update tileConfig to embed the PowerBI visual
    this.visualConfig = {
      ...this.visualConfig,
      id: visualConfigResponse.Id,
      embedUrl: visualConfigResponse.EmbedUrl,
      accessToken: visualConfigResponse.EmbedToken.Token,
      pageName: 'ReportSectioneb8c865100f8508cc533',
      visualName: '47eb6c0240defd498d4b',
    };

    this.displayMessage = 'Access token is successfully set. Loading Power BI visual.';
  }
}
