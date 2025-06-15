import { ICommentUser } from '../Comments/types';

export interface ICommentItemProps {
  isLoading: boolean;
  isEditing: boolean;
  comment: ICommentUser;
  userId: number | null;
  editedText: string;
  onEditClick: (id: number, text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
  onChangeText: (text: string) => void;
}
