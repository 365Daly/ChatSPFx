import * as React from 'react';
import styles from '../ChatSpfXv2.module.scss';

export interface IChatUIProps {
  apiKey: string;
}

export interface IChatUIState {
  messages: string[];
  currentInput: string;
}

export default class ChatUI extends React.Component<IChatUIProps, IChatUIState> {
  constructor(props: IChatUIProps) {
    super(props);
    this.state = {
      messages: [],
      currentInput: ''
    };
  }

  public render(): React.ReactElement<IChatUIProps> {
    return (
      <div className={styles.chatUI}>
        <div className={styles.chatContainer}>
          {this.state.messages.map((message, index) => (
            <div key={index} className={styles.message}>{message}</div>
          ))}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className={styles.input}
            placeholder="Type your message here..."
            value={this.state.currentInput}
            onChange={this.handleInputChange}
          />
          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </form>
      </div>
    );
  }
  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ currentInput: event.target.value });
  }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMessage = `Human: ${this.state.currentInput}`;
    this.setState(
      (prevState) => ({
        messages: [...prevState.messages, newMessage],
        currentInput: ''
      }),
      () => {
        this.sendMessage(newMessage);
      }
    );
  }

  private sendMessage = async (message: string) => {
    const apiKey = this.props.apiKey;

    const response = await fetch('https://jpd.openai.azure.com/openai/deployments/JPD35/completions?api-version=2022-12-01', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\n${this.state.messages.join('\n')}\nAI:`,
        max_tokens: 4000,
        temperature: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 1,
        stop: ["Human:", "AI:"],
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].text.trim();
    this.setState((prevState) => ({
      messages: [...prevState.messages, `AI: ${aiResponse}`],
    }));
  }
}
