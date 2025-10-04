-- Clear existing data and insert Portuguese items
-- This script updates the database with the complete Portuguese item list

-- First, clear existing data
TRUNCATE TABLE public.enxoval_items RESTART IDENTITY CASCADE;

-- Insert all 83 Portuguese items
INSERT INTO public.enxoval_items (item_name, room_category, purchase_status, priority, estimated_cost, actual_cost, quantity, notes) VALUES
-- Kitchen (Cozinha) - 20 items
('Conjunto de panelas', 'Kitchen', 'Not Purchased', 'High', 300.00, NULL, 1, 'Obrigatório'),
('Frigideiras (diferentes tamanhos)', 'Kitchen', 'Not Purchased', 'High', 120.00, NULL, 1, ''),
('Tábua de corte', 'Kitchen', 'Not Purchased', 'High', 40.00, NULL, 2, 'Plástico e madeira'),
('Jogo de facas', 'Kitchen', 'Not Purchased', 'High', 120.00, NULL, 1, ''),
('Conjunto de talheres', 'Kitchen', 'Not Purchased', 'High', 150.00, NULL, 1, ''),
('Pratos (rasos e fundos)', 'Kitchen', 'Not Purchased', 'High', 200.00, NULL, 1, 'Jogo de 8'),
('Copos para água/suco', 'Kitchen', 'Not Purchased', 'High', 100.00, NULL, 1, ''),
('Xícaras para café/chá', 'Kitchen', 'Not Purchased', 'Medium', 80.00, NULL, 1, ''),
('Potes para armazenamento', 'Kitchen', 'Not Purchased', 'Medium', 60.00, NULL, 1, 'Vários tamanhos'),
('Escorredor de louça', 'Kitchen', 'Not Purchased', 'High', 70.00, NULL, 1, ''),
('Escorredor de macarrão', 'Kitchen', 'Not Purchased', 'High', 30.00, NULL, 1, ''),
('Lixeira', 'Kitchen', 'Not Purchased', 'High', 50.00, NULL, 1, 'Com tampa'),
('Abridor de latas/garrafas', 'Kitchen', 'Not Purchased', 'High', 25.00, NULL, 1, ''),
('Ralador', 'Kitchen', 'Not Purchased', 'High', 25.00, NULL, 1, ''),
('Pano de prato', 'Kitchen', 'Not Purchased', 'High', 25.00, NULL, 6, ''),
('Microondas', 'Kitchen', 'Not Purchased', 'High', 400.00, NULL, 1, ''),
('Liquidificador', 'Kitchen', 'Not Purchased', 'High', 120.00, NULL, 1, ''),
('Cafeteira', 'Kitchen', 'Not Purchased', 'High', 150.00, NULL, 1, ''),
('Fogão/Forno', 'Kitchen', 'Not Purchased', 'High', 1800.00, NULL, 1, 'Gás ou elétrico'),
('Geladeira', 'Kitchen', 'Not Purchased', 'High', 2500.00, NULL, 1, 'Eficiente em energia'),

-- Living Room (Sala de Estar) - 9 items
('Sofá', 'Living Room', 'Not Purchased', 'High', 1500.00, NULL, 1, '3 lugares'),
('Rack para TV', 'Living Room', 'Not Purchased', 'High', 250.00, NULL, 1, ''),
('TV', 'Living Room', 'Not Purchased', 'High', 800.00, NULL, 1, 'Smart TV'),
('Cortinas', 'Living Room', 'Not Purchased', 'High', 200.00, NULL, 1, ''),
('Luminárias', 'Living Room', 'Not Purchased', 'High', 100.00, NULL, 1, 'Luminária de chão ou mesa'),
('Mesa de centro/lateral', 'Living Room', 'Not Purchased', 'Medium', 300.00, NULL, 1, ''),
('Tapete', 'Living Room', 'Not Purchased', 'Medium', 300.00, NULL, 1, ''),
('Almofadas', 'Living Room', 'Not Purchased', 'Low', 80.00, NULL, 4, ''),
('Manta para sofá', 'Living Room', 'Not Purchased', 'Low', 50.00, NULL, 2, ''),

-- Dining Room (Sala de Jantar) - 6 items
('Mesa de jantar', 'Dining Room', 'Not Purchased', 'High', 800.00, NULL, 1, 'Para 6-8 pessoas'),
('Cadeiras', 'Dining Room', 'Not Purchased', 'High', 600.00, NULL, 6, ''),
('Toalha de mesa', 'Dining Room', 'Not Purchased', 'Low', 40.00, NULL, 1, ''),
('Jogo americano', 'Dining Room', 'Not Purchased', 'Low', 30.00, NULL, 6, ''),
('Travessas para servir', 'Dining Room', 'Not Purchased', 'Medium', 80.00, NULL, 1, ''),
('Luminária pendente (Lustre)', 'Dining Room', 'Not Purchased', 'Medium', 200.00, NULL, 1, ''),

-- Bedroom (Quarto) - 10 items
('Cama', 'Bedroom', 'Not Purchased', 'High', 600.00, NULL, 1, 'Queen ou King size'),
('Colchão', 'Bedroom', 'Not Purchased', 'High', 1000.00, NULL, 1, 'Espuma ou molas'),
('Travesseiros', 'Bedroom', 'Not Purchased', 'High', 100.00, NULL, 4, ''),
('Jogo de lençóis (pelo menos 2)', 'Bedroom', 'Not Purchased', 'High', 150.00, NULL, 2, ''),
('Edredom/cobertor', 'Bedroom', 'Not Purchased', 'High', 150.00, NULL, 1, ''),
('Guarda-roupa', 'Bedroom', 'Not Purchased', 'High', 700.00, NULL, 1, 'Se não houver embutido'),
('Cabideiros', 'Bedroom', 'Not Purchased', 'High', 30.00, NULL, 30, ''),
('Espelho (corpo inteiro)', 'Bedroom', 'Not Purchased', 'Medium', 80.00, NULL, 1, ''),
('Cortinas', 'Bedroom', 'Not Purchased', 'High', 150.00, NULL, 1, 'Recomendado blackout'),
('Criado-mudo', 'Bedroom', 'Not Purchased', 'Medium', 200.00, NULL, 2, ''),

-- Bathroom (Banheiro) - 9 items
('Jogo de toalhas (banho, rosto e mão)', 'Bathroom', 'Not Purchased', 'High', 100.00, NULL, 1, ''),
('Tapete de Banho', 'Bathroom', 'Not Purchased', 'High', 25.00, NULL, 1, 'Antiderrapante'),
('Cortina para box', 'Bathroom', 'Not Purchased', 'High', 30.00, NULL, 1, 'Com forro'),
('Lixeira', 'Bathroom', 'Not Purchased', 'High', 20.00, NULL, 1, 'Pequena'),
('Porta-escova de dentes', 'Bathroom', 'Not Purchased', 'Medium', 15.00, NULL, 1, ''),
('Saboneteira', 'Bathroom', 'Not Purchased', 'Medium', 20.00, NULL, 1, ''),
('Escova sanitária', 'Bathroom', 'Not Purchased', 'High', 15.00, NULL, 1, 'Com suporte'),
('Espelho de Banheiro', 'Bathroom', 'Not Purchased', 'High', 60.00, NULL, 1, ''),
('Armário de Remédios', 'Bathroom', 'Not Purchased', 'Medium', 80.00, NULL, 1, ''),

-- Laundry (Lavanderia) - 5 items
('Máquina de lavar', 'Laundry', 'Not Purchased', 'High', 1500.00, NULL, 1, 'Front ou top load'),
('Varal (de chão)', 'Laundry', 'Not Purchased', 'High', 40.00, NULL, 1, 'Dobrável'),
('Ferro de passar', 'Laundry', 'Not Purchased', 'High', 60.00, NULL, 1, 'A vapor'),
('Tábua de passar', 'Laundry', 'Not Purchased', 'High', 50.00, NULL, 1, ''),
('Cesto para roupas (sujas)', 'Laundry', 'Not Purchased', 'High', 30.00, NULL, 1, ''),

-- Home Office (Escritório) - 7 items
('Mesa de Escritório', 'Home Office', 'Not Purchased', 'High', 400.00, NULL, 1, ''),
('Cadeira ergonômica', 'Home Office', 'Not Purchased', 'High', 300.00, NULL, 1, 'Ergonômica'),
('Organizador de mesa', 'Home Office', 'Not Purchased', 'High', 30.00, NULL, 1, ''),
('Luminárias de Mesa', 'Home Office', 'Not Purchased', 'High', 50.00, NULL, 1, ''),
('Papelaria básica', 'Home Office', 'Not Purchased', 'High', 20.00, NULL, 1, ''),
('Filtro de linha/extensão', 'Home Office', 'Not Purchased', 'High', 40.00, NULL, 1, ''),
('Roteador Wi-Fi', 'Home Office', 'Not Purchased', 'High', 150.00, NULL, 1, ''),

-- General (Geral) - 11 items
('Vassoura e Pá de Lixo', 'General', 'Not Purchased', 'High', 25.00, NULL, 1, ''),
('Rodo', 'General', 'Not Purchased', 'High', 15.00, NULL, 1, ''),
('Balde', 'General', 'Not Purchased', 'High', 20.00, NULL, 1, ''),
('Esfregão (Mop)', 'General', 'Not Purchased', 'High', 40.00, NULL, 1, ''),
('Flanelas', 'General', 'Not Purchased', 'High', 15.00, NULL, 1, ''),
('Luvas de Limpeza', 'General', 'Not Purchased', 'High', 10.00, NULL, 1, ''),
('Produtos de Limpeza (multiuso, desinfetante, limpa-vidros)', 'General', 'Not Purchased', 'High', 80.00, NULL, 1, ''),
('Kit de ferramentas básicas', 'General', 'Not Purchased', 'High', 100.00, NULL, 1, ''),
('Extintor de incêndio', 'General', 'Not Purchased', 'High', 50.00, NULL, 1, 'Segurança essencial'),
('Kit de primeiros socorros', 'General', 'Not Purchased', 'High', 40.00, NULL, 1, ''),
('Lanterna', 'General', 'Not Purchased', 'High', 20.00, NULL, 1, ''),

-- Outdoor (Área Externa) - 3 items
('Tapete para entrada', 'Outdoor', 'Not Purchased', 'High', 40.00, NULL, 1, ''),
('Iluminação externa', 'Outdoor', 'Not Purchased', 'High', 100.00, NULL, 1, ''),
('Vaso de plantas', 'Outdoor', 'Not Purchased', 'Low', 50.00, NULL, 1, '');
