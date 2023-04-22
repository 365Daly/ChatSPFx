import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneButtonType,
} from '@microsoft/sp-webpart-base';

import ChatUI from './components/ChatUI/ChatUI';
import { IChatSpfXv2WebPartProps } from './components/IChatSpfXv2WebPartProps';

export default class ChatSpfXv2WebPart extends BaseClientSideWebPart<IChatSpfXv2WebPartProps> {
  public render(): void {
    const element: React.ReactElement<IChatSpfXv2WebPartProps> = React.createElement(ChatUI, {
      apiKey: this.properties.apiKey,
    });

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    this.context.propertyPane.refresh();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Chatbot Configuration',
          },
          groups: [
            {
              groupName: 'Settings',
              groupFields: [
                PropertyPaneTextField('apiKey', {
                  label: 'API Key',
                }),
                PropertyPaneButton('saveAndClose', {
                  text: 'Save & Close',
                  buttonType: PropertyPaneButtonType.Primary,
                  onClick: () => {
                    this.context.propertyPane.close();
                  },
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
