import { Replace } from 'src/utils/replace';

interface NoteProps {
  title: string;
  description: string | null;
  userId: string;
  createdAt: Date;
}

export class Note {
  private props: NoteProps;
  private _id: string;

  constructor(
    props: Replace<
      NoteProps,
      { createdAt?: Date; description?: string | null }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      description: props.description || null,
    };
    this._id = id || crypto.randomUUID();
  }

  get id() {
    return this._id;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  get userId() {
    return this.props.userId;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
