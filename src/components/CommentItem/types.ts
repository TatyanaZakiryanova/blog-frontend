import { ICommentUser } from '../Comments/types';

export interface ICommentItemProps {
  isLoading: boolean;
  isEditing: boolean;
  comment: ICommentUser;
  userId: string | null;
  editedText: string;
  onEditClick: (id: string, text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onChangeText: (text: string) => void;
}
