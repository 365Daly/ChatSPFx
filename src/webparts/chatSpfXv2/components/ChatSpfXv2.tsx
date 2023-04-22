import * as React from 'react';
import styles from '../components/ChatUI/ChatUI.module.scss';
import { IChatSpfXv2Props } from './IChatSpfXv2WebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ChatSpfXv2 extends React.Component<IChatSpfXv2Props, {}> {
  public render(): React.ReactElement<IChatSpfXv2Props> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section>
    
      </section>
    );
  }
}
