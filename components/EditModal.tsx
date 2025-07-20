import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApplicationType, EditableFields, EditModalProps } from "@/lib";
import { FormEvent, useState } from "react";

const editableFields: EditableFields[] = [
  "company",
  "email",
  "message",
  "platform",
  "state",
  "url",
];

export function EditModal({
  open,
  closeModal,
  application,
  onEdit,
}: EditModalProps) {
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const updatedFields: Partial<ApplicationType> = {};
    editableFields.forEach((field) => {
      updatedFields[field] = formData?.get(field) as string;
    });

    console.log(updatedFields);

    try {
      await onEdit(updatedFields);
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <form className="flex flex-col gap-4" onSubmit={handleEdit}>
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
            <DialogDescription>
              Edita los campos de tu postulación. Haz clic en guardar cuando
              termines.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {editableFields.map((field) => {
              const value = application[field] ?? "";
              return (
                <div className="grid gap-3" key={field}>
                  <Label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    defaultValue={value}
                    disabled={loading}
                  />
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="cursor-pointer"
                type="button"
                onClick={closeModal}
                variant="outline"
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
