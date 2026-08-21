import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, cpfCnpj, phone } = await req.json();

    // Cole sua chave do Sandbox entre as aspas abaixo
    const apiKey = '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjM3OTgxMDMyLTYwNzUtNDc4MC1iOGNhLTU1NDc5NWZiYWMyMTo6JGFhY2hfMWIwMDA4NzQtYzdmMC00MmIzLWI0YmMtZjM1MTY4MDRlMTE0';

    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '');
    const cleanPhone = phone.replace(/\D/g, '');

    const baseUrl = 'https://sandbox.asaas.com/api/v3';

    const headers = {
      'Content-Type': 'application/json',
      'access_token': apiKey,
    };

    // 1. Criar Cliente
    const customerRes = await fetch(`${baseUrl}/customers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        email,
        cpfCnpj: cleanCpfCnpj,
        mobilePhone: cleanPhone,
      }),
    });

    const customer = await customerRes.json();

    if (!customerRes.ok || customer.errors) {
      const errorMsg = customer.errors?.[0]?.description || 'Erro ao cadastrar cliente.';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    // 2. Criar Cobrança
    const paymentRes = await fetch(`${baseUrl}/payments`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        customer: customer.id,
        billingType: 'UNDEFINED',
        value: 987.00,
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        description: 'Taxa de Adesão e Licença Inicial',
      }),
    });

    const payment = await paymentRes.json();

    if (!paymentRes.ok || payment.errors) {
      const errorMsg = payment.errors?.[0]?.description || 'Erro ao gerar cobrança.';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    return NextResponse.json({ invoiceUrl: payment.invoiceUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Falha interna na requisição.' }, { status: 500 });
  }
}