create or replace function public.dashboard_funnel_public_rows()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  source_config record;
  date_col text;
  email_col text;
  hours_col text;
  monthly_col text;
  level_col text;
  signal_col text;
  date_expr text;
  contact_expr text;
  hours_expr text;
  monthly_expr text;
  level_expr text;
  signal_expr text;
  source_rows jsonb;
  all_rows jsonb := '[]'::jsonb;
begin
  for source_config in
    select *
    from (
      values
        ('calculadora_horas_leads', 'Calculadora', 'Calculadora completada'),
        ('diagnostico_orden_leads', 'Diagnostico', 'Diagnostico completado')
    ) as sources(table_name, source_label, stage_label)
  loop
    if not exists (
      select 1
      from information_schema.tables
      where table_schema = 'public'
        and table_name = source_config.table_name
    ) then
      continue;
    end if;

    select column_name into date_col
    from information_schema.columns
    where table_schema = 'public'
      and table_name = source_config.table_name
      and column_name = any(array['created_at', 'submitted_at', 'completed_at', 'updated_at', 'fecha', 'date'])
    order by array_position(array['created_at', 'submitted_at', 'completed_at', 'updated_at', 'fecha', 'date'], column_name)
    limit 1;

    select column_name into email_col
    from information_schema.columns
    where table_schema = 'public'
      and table_name = source_config.table_name
      and column_name = any(array['email', 'correo', 'lead_email', 'contact_email'])
    order by array_position(array['email', 'correo', 'lead_email', 'contact_email'], column_name)
    limit 1;

    select column_name into hours_col
    from information_schema.columns
    where table_schema = 'public'
      and table_name = source_config.table_name
      and column_name = any(array['weekly_hours', 'weekly_hours_lost', 'total_weekly_hours', 'total_hours', 'hours_lost', 'horas_perdidas', 'horas_semanales', 'total_horas'])
    order by array_position(array['weekly_hours', 'weekly_hours_lost', 'total_weekly_hours', 'total_hours', 'hours_lost', 'horas_perdidas', 'horas_semanales', 'total_horas'], column_name)
    limit 1;

    select column_name into monthly_col
    from information_schema.columns
    where table_schema = 'public'
      and table_name = source_config.table_name
      and column_name = any(array['monthly_cost', 'estimated_monthly_cost', 'costo_mensual', 'fuga_mensual', 'monthly_loss'])
    order by array_position(array['monthly_cost', 'estimated_monthly_cost', 'costo_mensual', 'fuga_mensual', 'monthly_loss'], column_name)
    limit 1;

    select column_name into level_col
    from information_schema.columns
    where table_schema = 'public'
      and table_name = source_config.table_name
      and column_name = any(array['level', 'nivel', 'resultado', 'result', 'archetype', 'arquetipo', 'diagnostic_level'])
    order by array_position(array['level', 'nivel', 'resultado', 'result', 'archetype', 'arquetipo', 'diagnostic_level'], column_name)
    limit 1;

    select column_name into signal_col
    from information_schema.columns
    where table_schema = 'public'
      and table_name = source_config.table_name
      and column_name = any(array['main_pain', 'pain', 'dolor', 'mayor_desorden', 'biggest_problem', 'resultado', 'result', 'level', 'nivel'])
    order by array_position(array['main_pain', 'pain', 'dolor', 'mayor_desorden', 'biggest_problem', 'resultado', 'result', 'level', 'nivel'], column_name)
    limit 1;

    date_expr := case when date_col is null then 'now()' else format('t.%I', date_col) end;
    contact_expr := case
      when email_col is null then quote_literal('Contacto protegido')
      else format(
        'case when t.%1$I is null or position(''@'' in t.%1$I::text) = 0 then %2$L else left(split_part(t.%1$I::text, ''@'', 1), 2) || ''***@'' || split_part(t.%1$I::text, ''@'', 2) end',
        email_col,
        'Contacto protegido'
      )
    end;
    hours_expr := case when hours_col is null then '0' else format('coalesce(nullif(t.%I::text, '''')::numeric, 0)', hours_col) end;
    monthly_expr := case when monthly_col is null then '0' else format('coalesce(nullif(t.%I::text, '''')::numeric, 0)', monthly_col) end;
    level_expr := case when level_col is null then quote_literal('Sin clasificar') else format('coalesce(nullif(t.%I::text, ''''), %L)', level_col, 'Sin clasificar') end;
    signal_expr := case when signal_col is null then quote_literal('Registro recibido') else format('coalesce(nullif(t.%I::text, ''''), %L)', signal_col, 'Registro recibido') end;

    execute format(
      'select coalesce(jsonb_agg(jsonb_build_object(
        ''source'', %L,
        ''stage'', %L,
        ''created_at'', %s,
        ''contact_label'', %s,
        ''weekly_hours'', %s,
        ''monthly_cost'', %s,
        ''level'', %s,
        ''signal'', %s
      ) order by %s desc), ''[]''::jsonb)
      from public.%I t
      limit 500',
      source_config.source_label,
      source_config.stage_label,
      date_expr,
      contact_expr,
      hours_expr,
      monthly_expr,
      level_expr,
      signal_expr,
      date_expr,
      source_config.table_name
    )
    into source_rows;

    all_rows := all_rows || coalesce(source_rows, '[]'::jsonb);
  end loop;

  return all_rows;
end;
$$;

grant execute on function public.dashboard_funnel_public_rows() to anon, authenticated;
