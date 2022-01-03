export interface Books {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  fechaPublicacion: Date | undefined;
  autor: {
    id: string;
    nombreCompleto: string;
  };
}
